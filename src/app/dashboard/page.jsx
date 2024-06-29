import React from 'react'
import { auth } from '@/lib/firebase'

export default function page() {

    const user = auth.currentUser
    var displayName = ''
    
    if (user !== null) {
        displayName = user.displayName
    }

  return (
    <div className='flex items-center justify-center h-screen'>
        <h1>Welcome {displayName}</h1>
    </div>
  )
}
