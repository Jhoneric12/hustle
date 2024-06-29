import React from 'react'
import TextField  from '@mui/material/TextField'

export default function Input({ label, variant, size, onChange, type }) {
  return (
    <TextField 
        fullWidth 
        label={label} 
        variant={variant}
        size={size}
        onChange={onChange}
        type={type}
    />
  )
}
