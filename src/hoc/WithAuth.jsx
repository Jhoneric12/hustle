'use client'

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function withAuth (WrappedComponent) {

    return (props) => {

        const router = useRouter()
        const [isAuthenticated, setIsAuthenticated] = useState(false);

        useEffect(() => {
            const user = JSON.parse(localStorage.getItem('user'))

            if (!user) {
                setIsAuthenticated(false)
                router.push('/login')
            }
            else {
                setIsAuthenticated(true)
            }
        }, [router])

        return isAuthenticated ?  <WrappedComponent {...props} /> : null
    }
}