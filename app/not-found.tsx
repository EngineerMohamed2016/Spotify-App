import Link from 'next/link'
import React from 'react'

export default function NotFound() {
  return (
    <div className='text-center'>
        <p className='text-3xl mt-16 mb-5 text-white'>Page Not Found!</p>
        <Link href={'/'} aria-label='back' className='text-green-400 underline px-3 py-1'>Back to Spotify</Link>
    </div>
  )
}
