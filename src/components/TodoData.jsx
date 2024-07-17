import React from 'react'

export default function TodoData() {

    const data = [
        {
            id: 1,
            title: 'Completed Tasks',
            count: 4
        },
        {
            id: 2,
            title: 'Pending Tasks',
            count: 7
        },
        {
            id: 3,
            title: 'Hours Spent',
            count: 8
        },
        {
            id: 4,
            title: 'Sticky Notes',
            count: 1
        },
    ]


  return (
    <>
        <div className=' grid grid-cols-1 grid-rows-1 shadow-md rounded-lg bg-white p-2 w-full'>
            {
                data.map((todo) => (
                    <div key={todo.id} className='p-4 rounded-lg'>
                        <h1 className='font-bold'>{todo.count}</h1>
                        <p className='text-xs'>{todo.title}</p>
                    </div>
                )) 
            }
        </div>
    </>
  )
}
