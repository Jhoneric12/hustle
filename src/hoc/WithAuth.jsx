'use client'

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingBackdrop from "@/components/Backdrop";

export default function withAuth (WrappedComponent) {

    const WithAuth = (props) => {

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

        return isAuthenticated ?  <WrappedComponent {...props} /> : <LoadingBackdrop/>
    }

    return WithAuth
}