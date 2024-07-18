'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
    signInWithEmailAndPassword, 
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
import Link from 'next/link'

export default function LoginPage() {

    const router = useRouter()

    const [email, setEmail] = useState('')

    const [password, setPassword] = useState('')

    const [isLoading, setIsLoading] = useState(false)

    const [error, setIsError] = useState('')

    const [message, setIsMessge] = useState('')

    const actionCodeSettings =  {
        url: process.env.NODE_ENV === 'development' ? 'http://localhost:3000/user/dashboard' : 'hustle-rho.vercel.app/user/dashboard',
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
                setIsMessge('Check your email to continue')
                console.log('Sign In Successfully')
                window.localStorage.setItem('emailForSignIn', email);
                setIsLoading(false)
            })
            .catch((error) => {
                setIsMessge('This app exceeded daily qouta for email verification, Try OAuth instead')
                setIsLoading(false)
                console.error(error)
            })
    }

    // Authentication by Email and Password
    const handleSignIn = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        await signInWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
            setIsLoading(false)
            goToDashboard()
            console.log(userCredentials.user)
        })
        .catch((error) => {
            setIsLoading(false) 
            console.error = error.message;
            setIsError('Invalid Credentials')
        })
    }

    // Authentication by google
    const handleGoogle = async (e) => {
        e.preventDefault()
        await signInWithPopup(auth, googleProvider)
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
    const handleFacebook = async (e) => {
        e.preventDefault()
        await signInWithRedirect(auth, facebookProvider)
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
