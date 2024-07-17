import React from 'react'

export default function StickyWall({ children, category }) {
    
    const getCategory = (category) => {
        let backgroundColor = ''
        switch(category) {
            case 'Pesonal':
                backgroundColor = 'bg-personal'
                break
            case 'Organization':
                backgroundColor = 'bg-organization'
                break
            case 'School':
                backgroundColor = 'bg-school'
                break
            case 'Work':
                backgroundColor = 'bg-work'
                break
            default:
                backgroundColor = ''
        }
    }

    return (
        <>
            <div 
                className={`p-4 text-font-color bg-organization rounded-lg ${getCategory(category)}`}
            >
                {children}
            </div>
        </>
    )
}