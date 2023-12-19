import React from 'react'
import { BsMusicNote, BsMusicNoteBeamed } from 'react-icons/bs'

export default function Loading() {
    return (
        <div className='text-3xl flex gap-2 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
            <div className='text-blue-600 loading-1 relative'><BsMusicNote /></div>
            <div className='text-green-500 loading-2 relative'><BsMusicNoteBeamed /></div>
            <div className='text-red-500 loading-3 relative'><BsMusicNote /></div>
        </div>
    )
}
