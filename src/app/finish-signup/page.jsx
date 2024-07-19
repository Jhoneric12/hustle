'use client'

import React, { useEffect } from 'react'
import { auth } from '@/lib/firebase'
import { 
    isSignInWithEmailLink,
    signInWithEmailLink
} from 'firebase/auth'
import { useRouter } from 'next/navigation'

export default function page() {

    const router = useRouter()

    useEffect(() => {
        const finishingSignIn = () => {
            if (isSignInWithEmailLink(auth, window.location.href)) {
                let email = JSON.parse(window.localStorage.getItem('user'))
                if (!email) {
                    email = window.prompt('Please provide your email for confirmation');
                }
                signInWithEmailLink(auth, email, window.location.href)
                    .then(() => {
                        router.push('/user/dashboard')
                    })
                    .catch((error) => {
                        console.error(error)
                    })
            }
        }
        finishingSignIn()
    }, [])

  return (
    <div className='bg-accent-color min-h-screen flex justify-center items-center'>
        <h1 className='text-main-color font-bold md:text-lg text-center'>Redirecting to your dashboard. Please wait...</h1>
    </div>
  )
}
