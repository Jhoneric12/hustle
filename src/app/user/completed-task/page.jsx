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
    updateDoc
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

    const handleUpdate = async(id) => {
        await updateDoc(doc(db, 'todos', id), {
            isCompleted: false,
            isFocus: true
        })
    }

    const handleDelete = async (id) => {
        await deleteDoc(doc(db, "todos", id));
    }

    useEffect(() => {
       if (credentials?.uid) {
        setIsLoading(true)
        const q = query(collection(db, 'todos'),
                  where('isCompleted', '==', true),
                  where('userId', '==', credentials?.uid)
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
                    todo.map((todo) => (
                        <>
                            <div key={todo?.id}>
                                <Todos 
                                    handleComplete={() => handleUpdate(todo?.id)}
                                    handleDelete={() => handleDelete(todo?.id)} 
                                    category={todo?.category}
                                    lineThrough={'line-through'}
                                    isDone={true}
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

export default withAuth(CompletedTasks)