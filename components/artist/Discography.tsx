'use client'
import React, { useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { formatName } from '@/utils/ReturnTwoWords';
import { disco_PropsT } from '@/types/Artist';


export default function Discography({ artObj }: disco_PropsT) {
    const [type, setType] = useState('popular'); // popular releases |or| albums |or| singles

    // 3 arrs
    const popularReleases = artObj.discography.popularReleases.items;
    const albums = artObj.discography.albums.items;
    const singles = artObj.discography.singles.items;
    // current arr of type
    const currentArr = type === 'popular' ? popularReleases : type === 'albums' ? albums : singles;

    return (
        <div>
            <p className='text-2xl font-bold mb-4 pt-8 text-white'>Discography</p>

            <div className='text-white mb-5 flex items-center justify-center sm:justify-start gap-3'>
                <button onClick={() => setType('popular')} aria-label='popular' className={`${type === 'popular' ? 'bg-white text-black' : 'bg-slate-800'} rounded-full px-3 py-1 text-sm`}>Popular Releases</button>
                <button onClick={() => setType('albums')} aria-label='albums' className={`${type === 'albums' ? 'bg-white text-black' : 'bg-slate-800'} rounded-full px-3 py-1 text-sm`}>Albums</button>
                <button onClick={() => setType('singles')} aria-label='singles' className={`${type === 'singles' ? 'bg-white text-black' : 'bg-slate-800'} rounded-full px-3 py-1 text-sm`}>Singles</button>
            </div >

            <div className='flex flex-wrap justify-center md:justify-start gap-5'>
                {
                    currentArr.map((obj, i: number) => {
                        const albumId = obj.releases.items[0].id;
                        const albumName = formatName(obj.releases.items[0].name);
                        const imgUrl = obj.releases.items[0].coverArt.sources[2].url;

                        return (
                            <div key={i} className='text-center md:text-left p-4 w-[160px] lg:w-[180px] h-[240px] rounded-md text-white relative duration-300 bg-white/5 hover:bg-white/20 disco'>
                                <div className='relative'>
                                    <Image src={imgUrl} priority className='object-cover mx-auto h-[140px] rounded-md' width={180} height={140} alt='deleted' />
                                </div>
                                <p className=' font-semibold mt-3 mb-1'>{albumName}</p>
                                <p className='text-white/60 text-xs'> <span className='text-xs'>Type: </span> {type === 'singles' ? 'Single' : 'Album'} </p>
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
