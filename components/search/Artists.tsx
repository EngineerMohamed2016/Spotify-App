'use client'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { formatName } from '@/utils/ReturnTwoWords'
import { alt_img } from '@/utils/altImg'
import { ArtistsPropsT } from '@/types/Search'



export default function Artists({ artistsArr }: ArtistsPropsT) {
    return (
        <div>
            <p className='text-2xl font-bold mb-4 pt-8 text-white'>Artists</p>
            <div className='text-center md:text-left flex flex-wrap justify-center md:justify-start gap-5 mt-5'>
                {
                    artistsArr.map((obj, i: number) => {
                        const artistName = formatName(obj.data.profile.name);
                        const artistId = obj.data.uri.slice(15);
                        const imgUrl = obj.data.visuals.avatarImage ? obj.data.visuals.avatarImage.sources[0].url : alt_img;

                        return (
                            <div key={i} className='p-4 w-[160px] lg:w-[180px] h-[240px] rounded-md text-white relative duration-300 bg-white/5 hover:bg-white/20 disco'>
                                <div className='relative'>
                                    <Image src={imgUrl} priority className='object-cover mx-auto h-[130px] rounded-full' width={130} height={1.0} alt='deleted' />
                                </div>
                                <p className=' font-semibold mt-3 mb-1 sm:text-lg'>{artistName}</p>
                                <p className='text-white/60 text-md sm:text-sm'>Artist</p>
                                <Link prefetch={false} href={`/artist/${artistId}`} className='block absolute w-full h-full top-0 left-0 z-10' aria-label='link'></Link>
                            </div>
                        )
                    }

                    )
                }
            </div>
        </div>
    )
}
