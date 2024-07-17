'use client'

import React, { useEffect, useState } from 'react'
import withAuth from '@/hoc/WithAuth'
import PageTitle from '@/components/PageTitle'
import CircularProgress from '@mui/material/CircularProgress';
import { 
  collection, 
  query, 
  where,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import useAuth from '@/hooks/useAuth';
import Todos from '@/components/Todos';
import NoMessage from '@/components/NoContent';
import Message from '@/components/Message';

const PendingTask = () => {

    const [todo, setTodo] = useState([])
    
    const [isLoading, setIsLoading] = useState(false)

    const { credentials } = useAuth()

    const [isOpen, setIsOpen] = useState(false)

    const handleDelete = async (id) => {
        await deleteDoc(doc(db, 'todos', id))
        setIsOpen(true)
    }

    const handleFocus = async (id) => {
        await updateDoc(doc(db, 'todos', id), {
          isFocus: true
        })
    }

    useEffect(() => {
        if (credentials?.uid) {
            setIsLoading(true)
            const q = query(collection(db, 'todos'),
                      where('isCompleted', '==', false),
                      where('isFocus', '==', false),
                      where('userId', '==', credentials?.uid)
                    )
            const unsubscribe = onSnapshot(q, (querySnapShot) => {
              const todoData = []
              querySnapShot.forEach((doc) => {
                todoData.push({ id: doc.id, ...doc.data() })
              })
              setTodo(todoData)
              setIsLoading(false)
            })

            return () => {
                unsubscribe();
            };
        }
    }, [credentials])

    return (
        <>
            <Message isOpen={isOpen} message={'Task Deleted'}/>
            <PageTitle>Pending Task</PageTitle>
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
                          <NoMessage message={'pending task'}/>
                        </>
                    )
                    :
                    todo.map((todo) => (
                        <>
                            <div key={todo?.id}>
                                <Todos
                                    handleDelete={() => handleDelete(todo?.id)}
                                    handleFocus={()  => handleFocus(todo?.id)}
                                    category={todo?.category}
                                    hasFocusMode={true}
                                >
                                    {todo?.todo}
                                </Todos>
                            </div>
                        </>
                    ))
                }
            </div>
        </>
    )
}

export default withAuth(PendingTask)