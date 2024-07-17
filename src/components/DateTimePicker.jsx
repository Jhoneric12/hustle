import React from 'react'

export default function DateTimePicker({ placeholder, name, onChange }) {
  return (
    <input
        onChange={onChange}
        name={name}
        type="date" 
        placeholder={ placeholder }
        className='p-2 rounded-lg min-w-[7rem] border border-gray-300 outline-none text-sm w-full'
    />
  )
}
