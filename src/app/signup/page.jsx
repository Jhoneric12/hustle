'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
    GoogleAuthProvider, 
    createUserWithEmailAndPassword,
    signInWithPopup
} from 'firebase/auth'
import { 
    auth,
    googleProvider 
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

export default function SignUpPage() {

    const router = useRouter()

    const [email, setEmail] = useState('')

    const [password, setPassword] = useState('')

    const [isLoading, setIsLoading] = useState(false)

    const [error, setIsError] = useState('')

    const goToDashboard = () => {
      router.push('/user/dashboard')
    }

    const handleSignUp = (e) => {
      setIsLoading(true)
      e.preventDefault()
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
          setIsLoading(false)
          goToDashboard()
          console.log(userCredential.user);
      })
      .catch(() => {
        setIsError('Your email is already in use')
        setIsLoading(false)
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

  return (
    <>
        <AuthHeader/>
        <div className='bg-main-color flex items-center justify-center min-h-screen px-4'>
            <Form onSubmit={handleSignUp} >
                <h1 className='font-bold text-lg'>Sign Up</h1>
                <div className='w-[80%] '>
                    <Providers onClick={handleGoogle} provider={'Continue with Google'}>
                        <FcGoogle/>
                    </Providers>
                    <Providers  provider={'Continue with Meta'}>
                        <FaFacebookF/>
                    </Providers>
                </div>
                <div className='mt-6 mb-6 w-full flex flex-col gap-4'>
                    <Input 
                        label={'Email'} 
                        variant={'outlined'} 
                        size={'normal'} 
                        onChange={(e) => setEmail(e.target.value)}
                        type={'email'}
                    />
                    <Input 
                        label={'Password'} 
                        variant={'outlined'} 
                        size={'normal'} 
                        onChange={(e) => setPassword(e.target.value)}
                        type={'password'}
                    />
                    <span className='text-red-500 font-semibold'>{error}</span>
                </div>
                <Button type={'submit'}>
                    {
                        isLoading 
                        ? 
                            <CircularProgress size={20} color='inherit'/>
                        :
                            'Signup'
                    }
                </Button>
                <h1 className='text-font-color text-sm'>Already have an account? <span><Link href={'/login'} className='text-main-color'>Go to login</Link></span></h1>
            </Form>
          </div>
    </>
  )
}
