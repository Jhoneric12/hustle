'use client'

import React, { useEffect, useState } from 'react';
import withAuth from '@/hoc/WithAuth';
import useAuth from '@/hooks/useAuth';
import PageTitle from '@/components/PageTitle';
import Textarea from '@/components/Textarea';
import Todos from '@/components/Todos';
import CircularProgress from '@mui/material/CircularProgress';
import Message from '@/components/Message';
import NoMessage from '@/components/NoContent';
import { 
  collection, 
  query, 
  where,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
  orderBy,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

const Dashboard = () => {

  const {credentials} = useAuth()

  const [todo, setTodo] = useState([])

  const [isLoading, setIsLoading] = useState(false)

  const [isOpen, setIsOpen] = useState(false)

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'todos', id))
    setIsOpen(true)
  }

  const handleFocus = async (id) => {
    await updateDoc(doc(db, 'todos', id), {
      isFocus: true
    })
    setIsOpen(true)
  }

  useEffect(() => {
    if (credentials?.uid) {
      setIsLoading(true);
      const q = query(
        collection(db, 'todos'),
        where('isCompleted', '==', false),
        where('isFocus', '==', false),
        where('userId', '==', credentials.uid),
        orderBy('timestamp')
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
        <Message isOpen={isOpen} message={'Added to focus task'}/>
        <PageTitle>
          {
            credentials?.displayName
          } 's Worskspace
        </PageTitle>
        <h1 className='text-font-color font-semibold mb-6'>Todo</h1>
        <Textarea placeholder={'Task Name'}></Textarea>
        <h1 className='text-main-color font-semibold mb-4'>Today</h1>
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
                <div key={todo?.id}>
                  <Todos 
                    handleDelete={() => handleDelete(todo?.id)} 
                    category={todo?.category}
                    handleFocus={() => handleFocus(todo?.id)}
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
  );
};

export default withAuth(Dashboard);
