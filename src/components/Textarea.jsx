'use client'

import React, { useState } from 'react'
import Dropdown from './Select'
import DateTimePicker from './DateTimePicker'
import Button from './Button'  
import { 
    collection, 
    addDoc, 
    serverTimestamp 
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import useAuth from '@/hooks/useAuth'

export default function Textarea({ placeholder, children }) {

    const { credentials } = useAuth()

    const [isLoading, setIsLoading] = useState(false)

    const [todos, setTodos] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target

        setTodos({...todos, [name]: value})
    }

    const  handleClick = async (e) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            await addDoc(collection(db , 'todos'), {
                userId: credentials?.uid ? credentials?.uid : JSON.parse(window.localStorage.getItem('user')),
                ...todos,
                isFocus: false,
                isCompleted: false,
                timestamp: serverTimestamp()
            });
            setIsLoading(false)
        }
        catch (error) {
            console.log(error)
        }
    }

    const optionList = [
        {
            id: 1,
            title: 'Task',
            value: 'Task'
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
        <form onSubmit={handleClick} className='w-full flex flex-col rounded-xl border-1 border-grayy-300 mb-6'>
            <textarea
                    name='todo'
                    onChange={handleChange} 
                    rows={'4'} 
                    placeholder={ placeholder } 
                    className='w-full focus:outline-main-color p-4 text-font-color'>
                {children}
            </textarea>
            <div className='flex flex-col items-center md:flex-row gap-4 justify-between bg-white p-4 border-t border-t-gray-300'>
                <div className='flex items-center gap-2 w-full'>
                    <Dropdown onChange={handleChange}  name={'category'}>
                        {
                            optionList.map((list) => (
                                <>
                                    <option key={list.id} value={list.value}>{list.title}</option>
                                </>
                            ))
                        }
                    </Dropdown>
                    <DateTimePicker onChange={handleChange} name={'date'} placeholder={'Due date'}/>
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
