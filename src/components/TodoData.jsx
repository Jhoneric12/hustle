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
        // {
        //     id: 3,
        //     title: 'Hours Spent',
        //     count: 8
        // },
        // {
        //     id: 3,
        //     title: 'Sticky Notes',
        //     count: 1
        // },
    ]


  return (
    <>
        <div className='flex justify-center items-center shadow-md rounded-lg bg-white py-10 w-full'>
            {/* {
                data.map((todo) => (
                    <div key={todo.id} className='p-4 rounded-lg'>
                        <h1 className='font-bold'>{todo.count}</h1>
                        <p className='text-xs'>{todo.title}</p>
                    </div>
                )) 
            } */}

            <h1 className='text-main-color font-bold text-lg'>Hustle</h1>
        </div>
    </>
  )
}
