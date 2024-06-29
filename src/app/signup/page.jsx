'use client'

import React from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebase'

export default function Auth() {

    const email = 'jhonerix23@gmail.com';
    const password = 'JEAton123++';

    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log(userCredential.user);
        })
    }

  return (
    <div>
        <h1>Sign Up</h1>
        <button onClick={handleSignUp}>Click this to sign up</button>
    </div>
  )
}
