'use client'

import React, {useEffect, useRef, useState} from 'react'

export default function Todos({ 
  children, 
  category, 
  handleDelete, 
  handleFocus, 
  lineThrough, 
  hasFocusMode, 
  isFocus, 
  isDone, 
  handleComplete 
}) {

    let borderColor

    const [isShown, setIsShown] = useState(false)

    const [isHovered, setIsHovered] = useState(false)

    const hoverRef = useRef(null)

    const handleSwitch = () => {
      setIsShown(!isShown)
    }

    useEffect(() => {

      const handleMouseEnter = () => {
        setIsHovered(true)
      }

      const handleMouseLeave = () => {
        setTimeout(() => {
          setIsHovered(false)
        }, 2000)
      }

      const hover = hoverRef.current

      if (hover) {
        hover.addEventListener('mouseenter', handleMouseEnter)
        hover.addEventListener('mouseleave', handleMouseLeave)

        return () => {
          hover.removeEventListener('mouseenter', handleMouseEnter)
          hover.removeEventListener('mouseleave', handleMouseLeave)
        }
      }


    }, [])

    const getCategory = (category) => {
        
        switch(category) {
          case 'Personal':
            borderColor = 'border-l-8 border-l-personal'
            break
          case 'Work':
            borderColor = 'border-l-8 border-l-work'
            break
          case 'School': 
            borderColor = 'border-l-8 border-l-school'
            break
          case 'Organization': 
            borderColor = 'border-l-8 border-l-organization'
            break
          default:
            borderColor = 'border-l-8'
        }
        return borderColor
      }

    return (
        <>
          <div className={`py-2 px-6 bg-white rounded-lg flex justify-between items-center ${getCategory(category)} shadow-sm hover:bg-gray-100 overflow-y-auto`}>
                <div className='flex items-center gap-4'>
                    {
                      isFocus && (
                        <>
                          <div ref={hoverRef} onClick={handleComplete} className='w-1 h-1 relative select-none rounded-full border-font-color border flex justify-center items-center p-2 cursor-pointer'>
                            <h1 className={`${isHovered ? 'text-main-color' : 'hidden'}`}>✔</h1>
                          </div>
                          {/* <svg onClick={handleComplete} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 hover:text-main-color">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                          </svg> */}
                        </>
                      )
                    }
                    {/* <input type="checkbox" checked={isChecked} onChange={handleDone} /> */}
                    <p className={`leading-7 text-font-color ${lineThrough}`}>{children}</p>
                </div>
                <div className='flex items-center gap-2 text-font-color'>
                    {
                      hasFocusMode && (
                        <>
                          <svg onClick={handleFocus} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className='size-5 hover:text-main-color'>
                              <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                          </svg>
                        </>
                      )
                    }
                    <svg onClick={handleDelete} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 hover:text-red-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                </div>
          </div>
        </>
    )
}