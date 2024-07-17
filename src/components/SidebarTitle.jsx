import React from 'react'

export default function SidebarTitle({ children }) {
  return (
    <>
        <h1 className='text-font-color font-bold'>
          {children}
        </h1>
    </>
  )
}
