'use client'
import Link from 'next/link'
import React from 'react'
import { PiMagnifyingGlassFill } from 'react-icons/pi'
import { AiFillHome } from 'react-icons/ai'
import { usePathname } from 'next/navigation';
import Image from 'next/image'
import logo from 'public/logo.svg'
import { useCustomContext } from '@/contextApi/Context'

export default function SideBar() {
    const path = usePathname();
    const { setQuery, setSearchItem } = useCustomContext();

    return (
        <>
            <div className='flex gap-2 items-center relative mb-5 pb-2 border-b border-white/20'>
                <Image priority src={logo} width={50} height={50} alt='deleted' />
                <p className='text-white text-3xl font-bold '>Spotify</p>
                <Link href={'/'} className='block absolute left-0 top-0 w-full h-full' aria-label='link'></Link>
            </div>
            <Link href={'/'} className={`${path === '/' ? 'text-white' : 'text-white/50'} flex gap-3 items-center mb-3 hover:text-white duration-100`} aria-label='link'><AiFillHome className='text-3xl' /> Home</Link>
            <Link href={'/search'} onClick={() => { setSearchItem(''); setQuery('') }} className={`${path.includes('/search') ? 'text-white' : 'text-white/50'} flex gap-3 items-center hover:text-white duration-100`} aria-label='link'><PiMagnifyingGlassFill className='text-3xl' />Search</Link>
            <h1 className='absolute bottom-5 left-1/2 -translate-x-1/2 text-white/70 text-xs text-center'> Engineer Mohamed</h1>
        </>
    )
}
