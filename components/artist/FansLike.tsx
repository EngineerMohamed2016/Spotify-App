import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { formatName } from '@/utils/ReturnTwoWords'
import {  } from '@/types/common';
import { fansPropsT, fans_Arr_obj } from '@/types/Artist';


export default function FansLike({ artObj }: fansPropsT) {
    // arr of related artists
    const artists = artObj.relatedContent.relatedArtists.items;

    return (
        <div>
            <p className='text-2xl font-bold mb-4 pt-8 text-white'>Fans also l ike</p>
            <div className='text-center md:text-left flex flex-wrap justify-center md:justify-start gap-5 mt-5'>
                {
                    artists.map((obj: fans_Arr_obj, i: number) => {
                        const artId = obj.id;
                        const artName = formatName(obj.profile.name);
                        const imgUrl = obj.visuals.avatarImage.sources[0].url;

                        return (
                            <div key={i} className='p-4 w-[160px] lg:w-[180px] h-[240px] rounded-md text-white relative duration-300 bg-white/5 hover:bg-white/20 disco'>
                                <div className='relative'>
                                    <Image src={imgUrl} priority className='object-cover mx-auto h-[130px] rounded-full' width={130} height={130} alt='deleted' />
                                </div>
                                <p className=' font-semibold mt-3 mb-1'>{artName}</p>
                                <p className='text-white/60 text-xs'>Artist</p>
                                <Link prefetch={false} href={`/artist/${artId}`} className='block absolute w-full h-full top-0 left-0 z-10' aria-label='link'></Link>
                            </div>

                        )
                    }
                    )
                }
            </div>
        </div>
    )
}
