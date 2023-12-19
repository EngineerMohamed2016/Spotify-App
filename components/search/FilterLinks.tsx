'use client'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React from 'react'

const links = [
  {param: '',name:'All'},
  {param: 'artists',name:'Artists'},
  {param: 'albums',name:'Albums'},
  {param: 'songs',name:'Songs'},
]

export default function FilterLinks({ artistName }: { artistName: string }) {
  const params = useParams();

  return (
    <div className='bg-slate-950 sticky left-0 top-[59px] py-5 z-50 text-white flex gap-3 justify-center' >
      {
        links.map((link,i)=>
        <Link key={i} prefetch={false} href={`/search/${artistName}/${link.param}`} className={`${params.query === artistName ? 'bg-white text-black' : 'bg-white/20 hover:bg-white/30 duration-300'} px-3 py-px rounded-full`} aria-label={`link${i}`}>{link.name}</Link>
        )
      }

    </div>
  )
}
