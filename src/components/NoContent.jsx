import React from 'react'
import Image from 'next/image'
import NoImage from '../assets/notif-svg.png'

export default function NoMessage({ message }) {
    return (
        <>
            <div className='flex justify-center w-full p-4 '>
                <div className='flex gap-2 flex-col items-center'>
                    <Image 
                        src={NoImage}
                        width={200}
                        height={200}
                        alt="No Image" 
                    />
                    <h1 className='text-font-color font-semibold text-sm '>No {message} at the moment</h1>
                </div>
            </div>
        </>
    )
}