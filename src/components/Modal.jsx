import React from 'react'
import Dropdown from './Select'
import DateTimePicker from './DateTimePicker'
import Button from './Button'

export default function Modal({ placeholder, children }) {

  const optionList = [
    {
        id: 1,
        title: 'Personal',
        value: 'Personal'
    },
    {
        id: 2,
        title: 'Organization',
        value: 'Organization'
    },
    {
        id: 3,
        title: 'Work',
        value: 'Work'
    },
    {
        id: 4,
        title: 'School',
        value: 'School'
    },
  ]

  return (
    <>
      <form className='w-full flex flex-col rounded-xl border-1 border-grayy-300 mb-6'>
            <textarea
                    name='todo'
                    rows={'4'} 
                    placeholder={ placeholder } 
                    className='w-full focus:outline-main-color p-4 text-font-color'>
                {children}
            </textarea>
            <div className='flex flex-col items-center md:flex-row gap-4 justify-between bg-white p-4 border-t border-t-gray-300'>
                <div className='flex items-center gap-2 w-full'>
                    <Dropdown  name={'category'}>
                        <option value=""> - Category - </option>
                        {
                            optionList.map((list) => (
                                <>
                                    <option key={list.id} value={list.value}>{list.title}</option>
                                </>
                            ))
                        }
                    </Dropdown>
                </div>
                <div className='w-full md:w-1/2'>
                    <Button type={'submit'}>
                        Create Task
                    </Button>
                </div>
            </div>
      </form>
    </>
  )
}