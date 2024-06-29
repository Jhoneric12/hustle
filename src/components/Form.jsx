import React from 'react'

export default function Form({ children, onSubmit }) {
  return (
    <form 
        onSubmit={ onSubmit }
        className='flex flex-col items-center justify-center gap-4
                 bg-white rounded-lg w-full py-10 px-4 md:w-[70%] lg:w-[40%]'
    >
        { children }
    </form>
  )
}
