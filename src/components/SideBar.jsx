import React, { useEffect, useState } from 'react'
import useAuth from '@/hooks/useAuth'
import Image from 'next/image'
import SidebarTitle from './SidebarTitle'
import SidebarLinks from './SidebarLinks'
import '../utils/styles.css'
import { signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { useRouter } from 'next/navigation'

export default function SideBar() {

    const router = useRouter()

    const { credentials } = useAuth()

    const [isOpen, setIOpen] = useState(false)

    const [userEmail, setUserEmail] = useState()

    const handleOpen = () => {
        setIOpen(!isOpen)
    }

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                localStorage.removeItem('user')
                router.push('/login')
            })
            .catch((error) => {
                console.error(error)
            })
    }

    useEffect(() => {
        if (window !== 'undefined') {
            const email = JSON.parse(window.localStorage.getItem('user'))
            setUserEmail(email)
          }
    }, [])

  return (
    <>
        <div className={isOpen ? 'hidden' : 'p-4 w-full'}>
            <div className='flex gap-4 items-center'>
                <svg onClick={handleOpen} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-font-color">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                </svg>

                <div>
                    <div className='flex gap-2 items-center'>
                        {
                            credentials?.photoURL ? (
                                <Image
                                    src={credentials?.photoURL}
                                    width={40}
                                    height={40}
                                    alt='Profile Photo'
                                    className='rounded-[50%]'
                                />
                            )
                            :
                            (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-10">
                                    <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                                </svg>

                            )
                        }
                        <h1 className='text-font-color text-sm font-semibold'>
                            {
                                credentials?.displayName ? credentials?.displayName : credentials?.email
                            }
                        </h1>
                    </div>
                </div>
            </div>
        </div>
        <aside className={isOpen ? 'sidebar fixed bg-white h-screen shadow-xl w-[70%] lg:w-[20%] rounded-lg ml-3 mt-2 mb-2 overflow-y-auto z-50' : 'hidden'}>
            <div className='flex justify-between items-center gap-4 w-full mb-10 py-6 px-5'>
                <div className='flex gap-2 items-center'>
                    {
                        credentials?.photoURL ? (
                            <Image
                                src={credentials?.photoURL}
                                width={40}
                                height={40}
                                alt='Profile Photo'
                                className='rounded-[50%]'
                            />
                        )
                        :
                        (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-10">
                                <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                            </svg>
                        )
                    }
                    <h1 className='text-font-color text-sm font-semibold'>{ credentials?.displayName ? credentials?.displayName : credentials?.email}</h1>
                </div>
                <div className='flex justify-center items-center gap-2 text-font-color'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className='w-4 h-4 md:w-5 md:h-5'>
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                    </svg>
                    <svg onClick={handleOpen} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-font-color">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                    </svg>
                </div>
            </div>
            <div className='flex flex-col gap-1 py-3 pl-10'>
                <SidebarTitle>Menu</SidebarTitle>
                <SidebarLinks handleClose={handleOpen} link={'/user/dashboard'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
                    Workspace
                </SidebarLinks>
                <SidebarLinks handleClose={handleOpen} link={'/user/focus-mode'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                    </svg>
                    Focus Mode
                </SidebarLinks>
                <SidebarLinks handleClose={handleOpen} link={'/user/completed-task'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 0 1 9 9v.375M10.125 2.25A3.375 3.375 0 0 1 13.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 0 1 3.375 3.375M9 15l2.25 2.25L15 12" />
                </svg>
                    Completed Tasks
                </SidebarLinks>
                <SidebarLinks handleClose={handleOpen} link={'/user/pending-task'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" />
                </svg>
                    Pending Tasks
                </SidebarLinks>
                {/* <SidebarLinks handleClose={handleOpen} link={'/user/sticky-wall'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                    </svg>
                    Sticky Wall
                </SidebarLinks> */}
                {/* <SidebarLinks handleClose={handleOpen} link={'/user/calendar'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                    </svg>
                    Calendar
                </SidebarLinks> */}
                
            </div>
            {/* <div className='py-3 pl-10'>
                <SidebarTitle>Lists</SidebarTitle>
            </div> */}
            <div className='absolute w-full bottom-0 py-3 pl-10'>
                <button 
                    className='flex gap-1 text-font-color 
                                text-sm items-center hover:bg-main-color
                              hover:text-white p-2 rounded-md w-full'
                    onClick={handleSignOut}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                    </svg>
                    Log Out
                </button>
            </div>
        </aside>
    </>
  )
}
