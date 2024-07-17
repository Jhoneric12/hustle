import React from 'react'
import Link from 'next/link'

export default function SidebarLinks({ children, link, handleClose }) {
  return (
    <>
        <Link 
              href={link} 
              onClick={handleClose}
              className='flex gap-1 text-font-color 
              text-xs md:text-sm items-center hover:bg-main-color
              hover:text-white p-2 rounded-md'>
            {children}
        </Link>
    </>
  )
}
