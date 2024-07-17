import React from 'react'

export default function Button({ onClick, children, type }) {
  
  return (
    <button 
        onClick={onClick}
        className='bg-main-color text-white px-10 py-2 rounded-md w-full hover:opacity-90'
        type={type}
    >
        { children }
    </button>
  )
}
