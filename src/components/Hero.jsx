'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import HeroImage from '../assets/hero-image-iphone.png'
import Button from './Button'
import { useRouter } from 'next/navigation'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function Hero() {
    
    const router = useRouter()

    const [isAuthenticated, setIsAuthenticated] = useState(false)

    let user 

    useEffect(() => {
        AOS.init({
            duration: 2000
        })

        if (window !== 'undefined') {
            const user = JSON.parse(window.localStorage.getItem('user'))
            if(user) {
                setIsAuthenticated(true)
            }
        }
    }, [])

    const goToLogin = () => {
        if(isAuthenticated) {
            router.push('/user/dashboard')
        }
        else {
            router.push('/login')
        }
    }
    
    return (
        <>
            <div className='min-h-screen px-4 py-6 md:px-14 lg:px-20 flex flex-col-reverse justify-center gap-8 md:gap-0 md:flex-row items-center text-font-color'>
                <div 
                    data-aos="fade-right"
                    className='flex flex-col gap-2'
                >
                    <h1 className='font-bold text-xl lg:text-4xl'>Unlock your potential.</h1>
                    <h1 className='font-bold text-xl lg:text-4xl'><span className='bg-accent-color px-2'>Hustle</span> your way to success.</h1>
                    <p className='text-sm leading-6 mt-4 md:w-[80%] lg:w-[70%]'>Unlock your potential. Hustle your way to success with a productivity app designed to transform your workflow and crush your goals.</p>
                    <div className='w-[10rem] mt-2'>
                        <Button onClick={goToLogin}>{ isAuthenticated ? 'Home' : 'Try it now' }</Button>
                    </div>
                </div>
                <div 
                    data-aos="fade-left"
                    className='md:block relative'
                >
                    <Image 
                        src={HeroImage}
                        width={400}
                        height={400}
                        className='w-[12rem] h-[12rem] md:w-[15rem] md:h-[15rem] lg:w-full lg:h-full'
                        alt='Hero Image'
                    />
                    <div 
                        data-aos="fade-up" 
                        className='bg-main-color p-2 absolute -top-5 right-10  lg:right-28 rounded-lg opacity-90'
                    >
                        <h1 className='text-white text-xs lg:text-sm'>Hi there</h1>
                    </div>
                </div>
            </div>
        </>
    )
}