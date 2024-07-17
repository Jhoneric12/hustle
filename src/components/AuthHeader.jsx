import React from 'react'
import Link from 'next/link'

export default function AuthHeader() {
  return (
    <Link 
        href={'/'} 
        className='p-6 flex justify-between absolute w-full bg-main-color'
      >
        <h1 className='text-white font-bold text-xl'>Hustle</h1>
        <div></div>
    </Link>
  )
}
