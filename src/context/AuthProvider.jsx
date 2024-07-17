'use client'

import React, { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/lib/firebase'

export const AuthContext = React.createContext()

export default function AuthProvider({ children }) {

    const [credentials, setCredentials] = useState(null)

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (user) => {

            if (user) {
                setCredentials(user)
            }
            else {
                setCredentials(null)
            }
        })

        return () => unSubscribe()
    }, [])

  return (
    <AuthContext.Provider value={{credentials}}>
        {children}
    </AuthContext.Provider>
  )
}
