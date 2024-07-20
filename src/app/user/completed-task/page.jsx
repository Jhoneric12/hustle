'use client'

import React, { useEffect, useState } from 'react'
import withAuth from '@/hoc/WithAuth'
import PageTitle from '@/components/PageTitle'
import { 
    collection,
    where,
    query,
    onSnapshot,
    deleteDoc,
    doc,
    updateDoc,
    orderBy
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import useAuth from '@/hooks/useAuth'
import Todos from '@/components/Todos'
import CircularProgress from '@mui/material/CircularProgress';
import NoMessage from '@/components/NoContent'

const CompletedTasks = () => {

    const { credentials } = useAuth()
    
    const [todo, setTodo] = useState([])

    const [isLoading, setIsLoading] = useState(false)

    const handleDelete = async (id) => {
        await deleteDoc(doc(db, "todos", id));
    }

    const groupedTodos = todo.reduce((accumulator, todo) => {
        let date = todo?.date
    
        const isValidDate = isNaN(Date.parse(date));
        if (isValidDate) {
          date = "No due date";
        }
        
        if(!accumulator[date]) {
          accumulator[date] = []
        }
    
        accumulator[date].push(todo)
        
        return accumulator
    }, {}) 
      
      const isToday = (dateString) => {
        const dateToday = new Date()
    
        const date = new Date(dateString)
    
        return dateToday.toDateString() === date.toDateString()
    
    }

    useEffect(() => {
       if (credentials?.uid) {
        setIsLoading(true)
        const q = query(collection(db, 'todos'),
                  where('isCompleted', '==', true),
                  where('userId', '==', credentials?.uid),
                  orderBy('timestamp')
                )
        const unsubscribe = onSnapshot(q, (querySnapShot) => {
                const todoArray = []
                querySnapShot.forEach((doc) => {
                    todoArray.push({ id: doc.id, ...doc.data() });
                })
                setTodo(todoArray)
                setIsLoading(false)
                })
                
        return () => {
            unsubscribe()
        }
       }

    }, [credentials])

    return (
        <>
            <PageTitle>Completed Tasks</PageTitle>
            <div className='flex flex-col gap-4 mt-6'>
                {
                    isLoading && 
                    <>
                        <CircularProgress size={20} color='primary'/>
                    </>
                }
                {
                    todo.length === 0 ? (
                        <>
                          <NoMessage message={'completed task'}/>
                        </>
                    )
                    :
                    Object.keys(groupedTodos).map((date) => (
                        <div key={date} className='flex flex-col gap-4 mt-2'>
                          <h1 className='text-main-color font-semibold'>{date === 'No due date' ? date : isToday(date) ? 'Today' : new Date(date).toDateString()}</h1>
                          {
                            groupedTodos[date].map((todo) => (
                              <>
                                <div key={todo?.id}>
                                  <Todos 
                                    handleDelete={() => handleDelete(todo?.id)} 
                                    lineThrough={'line-through'}
                                    category={todo?.category}
                                    isDone={true}
                                  >
                                    {todo?.todo}
                                  </Todos>
                                </div>
                              </>
                            ))
                          }
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default withAuth(CompletedTasks)