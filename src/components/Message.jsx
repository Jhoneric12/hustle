import React from 'react'
import Snackbar from '@mui/material/Snackbar';

export default function Message({ isOpen, message }) {

    
    return (
        <>
            <Snackbar
                open={isOpen}
                autoHideDuration={5000}
                message={message}
            />
        </>
    )
}