'use client'
import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { formatName } from '@/utils/ReturnTwoWords';
import {  } from '@/types/common';
import { search_AlbumsT } from '@/types/Search';


export default function Albums({ albumsArr }: search_AlbumsT) {

    return (
        <div>
            <p className='text-2xl font-bold mb-4 pt-8 text-white'>Albums</p>
            <div className='text-center md:text-left flex flex-wrap justify-center md:justify-start gap-5 mt-5'>
                {
                    albumsArr.map((obj, i: number) => {

                        const imgUrl = obj.data.coverArt.sources[2].url;
                        const albumName = formatName(obj.data.name);
                        const year = obj.data.date.year;
                        const artistName = formatName(obj.data.artists.items[0].profile.name);
                        const albumId = obj.data.uri.slice(14);


                        return (
                            <div key={i} className='p-4 w-[160px] lg:w-[180px] h-[240px] rounded-md text-white relative duration-300 bg-white/5 hover:bg-white/20 disco'>
                                <div className='relative'>
                                    <Image src={imgUrl} priority className='object-cover mx-auto h-[140px] rounded-md' width={180} height={140} alt='deleted' />
                                </div>
                                <p className=' font-semibold mt-3 mb-1 sm:text-lg'>{albumName}</p>
                                <p className='text-white/70 text-md sm:text-sm'> {year} • {artistName}</p>
                                <p className='text-white/50 text-sm sm:text-xs'> Album </p>
                                <Link prefetch={false} href={`/album/${albumId}`} className='block absolute w-full h-full top-0 left-0' aria-label='link'></Link>
                            </div>
                        )
                    }

                    )
                }
            </div>
        </div>
    )
}
