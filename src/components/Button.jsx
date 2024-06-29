import React from 'react'

export default function Button({ onClick, children, type }) {
  return (
    <button 
        onClick={onClick}
        className='bg-main-color text-white py-2 rounded-md w-full'
        type={type}
    >
        { children }
    </button>
  )
}
