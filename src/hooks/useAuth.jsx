import React from 'react'
import { AuthContext } from '@/context/AuthProvider'

export default function useAuth() {
  return React.useContext(AuthContext)
}
