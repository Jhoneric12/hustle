import React from 'react'

export default function Dropdown({ children, name, onChange }) {
  return (
    <>
        <select
                onChange={onChange}
                name={name}
                className='p-2 rounded-lg min-w-[7rem] border border-gray-300 outline-none text-sm w-full'
        >
            {children}
        </select>
    </>
  )
}
