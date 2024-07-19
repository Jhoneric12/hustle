'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
    signInWithRedirect, 
    GoogleAuthProvider, 
    FacebookAuthProvider, 
    signInWithPopup,
    sendSignInLinkToEmail
} from 'firebase/auth'
import { 
    auth, 
    googleProvider, 
    facebookProvider 
} from '@/lib/firebase'
import AuthHeader from '@/components/AuthHeader'
import Form from '@/components/Form'
import Button from '@/components/Button'
import Providers from '@/components/Providers'
import Input from '@/components/Input'
import CircularProgress from '@mui/material/CircularProgress';
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";

export default function LoginPage() {

    const router = useRouter()

    const [email, setEmail] = useState('')

    const [isLoading, setIsLoading] = useState(false)

    const [message, setIsMessge] = useState('')

    const actionCodeSettings =  {
        url: process.env.NODE_ENV === 'development' ? 'http://localhost:3000/finish-signup' : 'http://hustle-rho.vercel.app/finish-signup',
        handleCodeInApp: true
    }

    const goToDashboard = () => {
        router.push('/user/dashboard')
    }

    const handleEmailLinkSent = (e) => {
        e.preventDefault()
        setIsLoading(true)
        sendSignInLinkToEmail(auth, email, actionCodeSettings)
            .then(() => {
                window.localStorage.setItem('user', JSON.stringify(email))
                setIsMessge('Check your email to continue')
                console.log('Sign In Successfully')
                setIsLoading(false)
            })
            .catch((error) => {
                setIsMessge('This app exceeded daily qouta for email verification, Try OAuth instead')
                setIsLoading(false)
                console.error(error)
            })
    }

    // Authentication by google
    const handleGoogle = (e) => {
        e.preventDefault()
        signInWithPopup(auth, googleProvider)
        .then((result) => {
            localStorage.setItem('user', JSON.stringify(result.user))
            const credential = GoogleAuthProvider.credentialFromResult(result)
            const token = credential.accessToken
            goToDashboard()
            // console.log(user)
        })
        .catch((error) => {
            console.error(error)
        })
    }

    // Authentication by meta
    const handleFacebook = (e) => {
        e.preventDefault()
        signInWithRedirect(auth, facebookProvider)
        .then((result) => {
            goToDashboard()
            const user = result.user;
            const credential = FacebookAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            console.log(token)
            console.log(user)
        })
        .catch((error) => {
            console.error(error)
        })
    }

  return (
    <>
        <AuthHeader/>
        <div className='bg-main-color flex items-center justify-center min-h-screen px-4'>
            <Form onSubmit={handleEmailLinkSent}>
                <h1 className='font-bold text-lg'>Login to your account</h1>
                <div className='w-[80%] '>
                    <Providers onClick={handleGoogle} provider={'Continue with Google'}>
                        <FcGoogle/>
                    </Providers>
                    <Providers onClick={handleFacebook} provider={'Continue with Meta'}>
                        <FaFacebookF/>
                    </Providers>
                </div>
                <span className='text-font-color text-xs text-cebter'>or</span>
                <div className='mb-6 w-full flex flex-col gap-4'>
                    <Input 
                        label={'Email Address'} 
                        variant={'outlined'} 
                        size={'normal'} 
                        onChange={(e) => setEmail(e.target.value)}
                        type={'email'}
                    />
                    {/* <Input 
                        label={'Password'} 
                        variant={'outlined'} 
                        size={'normal'} 
                        onChange={(e) => setPassword(e.target.value)}
                        type={'password'}
                    /> */}
                    {
                        message && (
                            <span className='text-green-500 font-semibold text-sm'>{message}</span>
                        )
                    }
                </div>
                <Button type={'submit'}>
                    {
                        isLoading 
                        ? 
                            <CircularProgress size={20} color='inherit'/>
                        :
                            'Send'
                    }
                </Button>
                {/* <h1 className='text-font-color text-sm'>Don't have an account? <span><Link href={'/signup'} className='text-main-color'>Sign up</Link></span></h1> */}
            </Form>
        </div>
    </>
  )
}
