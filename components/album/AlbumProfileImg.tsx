import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {  } from '@/types/common';
import { AlbumProfileT } from '@/types/Album';

export default function AlbumProfileImg({ album }: AlbumProfileT) {
    const imgUrl = album.images[0].url;
    const albumName = album.name;
    const artId = album.artists[0].id;
    const artN = album.artists[0].name;
    const year = album.release_date.slice(0, 4);
    const tracksCount = album.total_tracks;

    return (
        <div className='bg-slate-900 h-[250px] md:h-[320px] text-white flex items-end p-6'>
            <div className='flex gap-5 items-end'>
                <Image src={imgUrl} priority className='w-[160px] h-[160px] md:w-[200px] md:h-[200px] object-cover duration-300 hover:scale-105' width={200} height={200} alt='delted' />
                <div className='flex flex-col gap-2'>
                    <p>Album</p>
                    <p className='text-md md:text-2xl font-bold'>{albumName}</p>
                    <div className='flex flex-col sm:flex-row gap-1 sm:items-center'>
                        <div className='flex gap-1 sm:gap-0'>
                            <Image src={imgUrl} className='w-[20px] h-[20px] rounded-full object-cover' width={20} height={20} alt='deleted' />
                            <Link prefetch={false} href={`/artist/${artId}`} className='underline text-sm' aria-label='link'>{artN}</Link>
                        </div>
                        <p className='text-sm md:text-md text-white/40'>{year} | {tracksCount}-Songs</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
