'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { FaBars } from 'react-icons/fa'
import logo from 'public/logo.svg'
import { AiFillHome } from 'react-icons/ai'
import { MdClose } from 'react-icons/md'
import { usePathname } from 'next/navigation'
import { PiMagnifyingGlassFill } from 'react-icons/pi'

export default function HiddenSideBar() {
    const path = usePathname();
    const [show, setShow] = useState(false);

    function handleClose() {
        setShow(false);
    }

    return (
        <div>
            <button onClick={() => setShow(true)} aria-label='show' className='bg-black/80 rounded p-1 text-white text-3xl md:hidden fixed left-6 top-[14px] lg:hidden z-[51]'><FaBars /></button>
            <div className={`md:hidden px-2 py-3 fixed w-screen h-screen z-[2000] ${show ? 'left-0' : '-left-full'} top-0 duration-500 bg-slate-800`}>
                <div className='flex gap-2 items-center relative mb-5 pb-2 border-b border-white/20'>
                    <Image priority src={logo} width={50} height={50} alt='deleted' />
                    <p className='text-white text-3xl font-bold'>Spotify</p>
                    <Link href={'/'} className='block absolute left-0 top-0 w-full h-full' aria-label='link'></Link>
                </div>
                <Link onClick={handleClose} href={'/'} className={`${path === '/' ? 'text-white' : 'text-white/50'} flex gap-3 items-center mb-3 hover:text-white duration-100`} aria-label='link'><AiFillHome className='text-3xl' /> Home</Link>
                <Link onClick={handleClose} href={'/search'} className={`${path.includes('/search') ? 'text-white' : 'text-white/50'} flex gap-3 items-center hover:text-white duration-100`} aria-label='link'><PiMagnifyingGlassFill className='text-3xl' />Search</Link>
                <button onClick={handleClose} aria-label='close' className='text-white text-4xl absolute right-10 top-4'><MdClose /> </button>
            </div>
        </div>
    )
}
