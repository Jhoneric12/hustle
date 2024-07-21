'use client'

import React, { useEffect, useState } from 'react'
import withAuth from '@/hoc/WithAuth'
import PageTitle from '@/components/PageTitle'
import CircularProgress from '@mui/material/CircularProgress';
import Todos from '@/components/Todos'
import { db } from '@/lib/firebase'
import { 
    collection, 
    query, 
    where,
    onSnapshot,
    updateDoc,
    deleteDoc,
    doc
} from 'firebase/firestore';
import useAuth from '@/hooks/useAuth'
import Timer from '@/components/Timer';
import NoMessage from '@/components/NoContent';
import { 
    AnimatePresence,
    motion
 } from 'framer-motion';

const Focus = () => {

    const { credentials } = useAuth()

    const [todo, setTodo] = useState([])

    const [isLoading, setIsLoading] = useState(false)

    const [isDone, setIsDone] = useState(false)

    const handleUpdate = async(id) => {

        const delay = (ms) => new Promise((resolve) => {
            setTimeout(resolve, ms)
        })

        await delay(1000)

        await updateDoc(doc(db, 'todos', id), {
            isCompleted: true,
            isFocus: false
        })
    }

    const handleDelete = async (id) => {
        await deleteDoc(doc(db, "todos", id));
    }

    useEffect(() => {
        if (credentials?.uid) {
          setIsLoading(true);
          const q = query(
            collection(db, 'todos'),
            where('isFocus', '==', true),
            where('userId', '==', credentials.uid),
            // orderBy('timestamp')
          );
          const unsubscribe = onSnapshot(q, (querySnapShot) => {
            const todoData = [];
            querySnapShot.forEach((doc) => {
              todoData.push({ id: doc.id, ...doc.data() });
            });
            setTodo(todoData);
            setIsLoading(false);
          });
    
          return () => {
            unsubscribe();
          };
        }
    }, [credentials]);

    return (
        <>
            <PageTitle>Focus Mode</PageTitle>
            <div className='mb-6'>
                <Timer/>
            </div>
            <h1 className='text-main-color font-semibold mb-6'>Focus Task</h1>
            <div className='flex flex-col gap-4'>
                {
                    isLoading && 
                    <>
                        <CircularProgress size={20} color='primary'/>
                    </>
                }
                {
                    todo.length === 0 ? (
                        <>
                          <NoMessage message={'todos'}/>
                        </>
                    )
                    :
                    todo.map((todo) => (
                        <>
                            <AnimatePresence>
                                <motion.div 
                                    key={todo?.id}
                                    initial={{ opacity: 1, x: 0 }} 
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 50 }}
                                    transition={{duration: 1}}
                                >
                                    <Todos 
                                        handleDelete={() => handleDelete(todo?.id)}
                                        handleComplete={() => handleUpdate(todo?.id)}
                                        category={todo?.category}
                                        isFocus={true}
                                    >
                                        {todo?.todo}
                                    </Todos>
                                </motion.div>
                            </AnimatePresence>
                        </>
                    ))
                }
            </div>
        </>
    )
}

export default withAuth(Focus)
