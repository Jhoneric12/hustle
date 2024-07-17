'use client'

import React from 'react'
import withAuth from '@/hoc/WithAuth'
import PageTitle from '@/components/PageTitle'
import StickyWall from '@/components/StickyWall'
import Button from '@/components/Button'
import Modal from '@/components/Modal'

const StickyNotes = () => {
    const notes = [
        {
            id: 1,
            title: 'Play piano',
            notes: 'Play me'
        },
        {
            id: 2,
            title: 'Play guita',
            notes: 'Play me'
        },
        {
            id: 3,
            title: 'Play saxophone',
            notes: 'Play me'
        },
        {
            id: 4,
            title: 'Play drums',
            notes: 'Play me'
        },
        {
            id: 5,
            title: 'Play piano',
            notes: 'Play me'
        },
    ]
    return (
        <>
            <div className='flex flex-col lg:flex-row lg:justify-between gap-2 w-full items-center mb-6'>
                <PageTitle>Sticky Wall</PageTitle>
                <div className='w-full lg:w-1/4'>
                    <Button>New note</Button>
                </div>
            </div>
            <Modal placeholder={'Sticky Name'}></Modal>
            <div className='flex flex-col gap-3 w-full'>
                {
                    notes.map((note) => (
                        <StickyWall key={note.id}>
                            <h1 className='font-semibold'>{note.title}</h1>
                            <p className='text-sm'>{note.notes}</p>
                        </StickyWall>
                    ))
                }
            </div>
        </>
    )
}

export default withAuth(StickyNotes)