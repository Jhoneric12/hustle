'use client'

import React from 'react'
import Button from './Button'
import { useRouter } from 'next/navigation'

export default function NavBar() {

    const router = useRouter()

    const goToLogin = () => {
        router.push('/login')
    }
    return (
        <>
            <nav className='flex justify-between items-center px-4 py-6 md:px-10 absolute w-full'>
                <div>
                    <h1 className='text-main-color font-bold text-lg lg:text-2xl'>Hustle</h1>
                </div>
                <div>
                    <Button onClick={goToLogin}>Login</Button>
                </div>
            </nav>
        </>
    )
}

