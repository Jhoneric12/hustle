import React from 'react'

export default function PageTitle({ children }) {
  return (
    <h1
        className='text-font-color font-bold lg:text-lg mb-4 '
    >
        {children}
    </h1>
  )
}
