'use client'

import React from 'react'
import SideBar from '@/components/SideBar'
import Calendar from '@/components/Calendar'
import TodoData from '@/components/TodoData'
import '../../utils/styles.css'

export default function UserLayout({ children }) {

  const removeLocalStorage = () => {
    localStorage.removeItem('user')
  }

  return (
    <>
        <div className='user-layout bg-accent-color min-h-screen lg:grid z-10'>
            <div className='w-full'>
              <SideBar/>
            </div>
            <div className='text-font-color px-3 lg:px-0 lg:pl-28 w-full py-4 z-10'>
              {children}
            </div>
            <div className='hidden lg:flex lg:flex-col lg:gap-4 px-10'>
                {/* <TodoData/> */}
                <Calendar/>
                {/* <button className='border' onClick={removeLocalStorage}>Remove Local storage</button> */}
            </div>
        </div>
    </>
  )
}
