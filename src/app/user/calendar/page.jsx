'use client'

import React from 'react'
import withAuth from '@/hoc/WithAuth'
import PageTitle from '@/components/PageTitle'

const Calendar = () => {
    return (
        <>
            <PageTitle>Calendar</PageTitle>
        </>
    )
}

export default withAuth(Calendar)

