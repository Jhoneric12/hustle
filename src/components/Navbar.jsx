'use client'

import React, { useEffect, useState } from 'react'
import Button from './Button'
import { useRouter } from 'next/navigation'
import useAuth from '@/hooks/useAuth'
import Image from 'next/image'

export default function NavBar() {

    const router = useRouter()

    const { credentials } = useAuth()

    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        if (window !== 'undefined') {
            const user = JSON.parse(window.localStorage.getItem('user'))
            if(user) {
                setIsAuthenticated(true)
            }
        }
    }, [])

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
                    {
                        isAuthenticated ? (
                            <>
                                <div className='flex gap-2 items-center'>
                                    <Image
                                        src={credentials?.photoURL}
                                        width={40}
                                        height={40}
                                        alt='Profile Photo'
                                        className='rounded-[50%]'
                                    />
                                    <h1 className='text-font-color text-sm font-semibold'>
                                        {
                                            credentials?.displayName
                                        }
                                    </h1>
                                </div>
                            </>
                        )
                        : (
                            <>
                                <Button onClick={goToLogin}>Login</Button>
                            </>
                        )
                    }
                </div>
            </nav>
        </>
    )
}

