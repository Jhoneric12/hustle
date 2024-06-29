import React from 'react'
import Image from 'next/image'

export default function Providers( { children, provider, onClick } ) {
  return (
    <div 
        className='border border-gray-300 p-2 rounded-lg w-full text-center mt-3 flex justify-center items-center gap-2 hover:cursor-pointer'
        onClick={onClick}
    >
        { children }
        <h1 className='text-xs md:text-sm'>{ provider }</h1>
    </div>
  )
}
