import SearchBar from '@/components/SearchBar'
import React from 'react'

export const metadata = {
    title: 'Search',
    description: 'Spotify Search'
}

export default function layout({ children }: { children: any }) {
    return (
        <div className='flex-grow px-5'>
            <SearchBar />
            {children}
        </div>
    )
}
