import { formatName } from '@/utils/ReturnTwoWords';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { topFifty_obj, topPropsT } from '@/types/Home';




export default function TopFiftySongs({ topFifty }: topPropsT) {
    // test if there is an error
    if (topFifty.error)
        return <p></p>

    // test if Api is still active
    if (topFifty.message)
        return <p></p>

    // now data is vaild
    topFifty.length = 50;
    return (
        <>
            <div className='px-5'>
                <p className='text-2xl font-bold mb-4 text-white'>Top 50 Songs This Month 🔝</p>
                <div className='text-center md:text-left flex flex-wrap justify-center md:justify-start gap-5 mt-5'>
                    {
                        topFifty.map((obj: topFifty_obj, i: number) => {
                            const trackName = formatName(obj.trackMetadata.trackName);
                            const artistName = obj.trackMetadata.artists[0].name;
                            const trackId = obj.trackMetadata.trackUri.slice(14);
                            const imgUrl = obj.trackMetadata.displayImageUri;


                            return (
                                <div key={i} className='p-4 w-[160px] lg:w-[180px] h-[240px] rounded-md text-white relative duration-300 bg-white/5 hover:bg-white/20 disco'>
                                    <div className='relative'>
                                        <Image src={imgUrl} priority className='object-cover mx-auto h-[130px] rounded-full' width={130} height={120} alt='deleted' />
                                    </div>
                                    <p className=' font-semibold mt-3 mb-1 sm:text-lg'>{trackName}</p>
                                    <p className='text-white/80 text-md sm:text-sm'>{artistName}</p>
                                    <p className='text-white/60 text-sm sm:text-xs'>Track</p>
                                    <Link prefetch={false} href={`track/${trackId}`} className='block absolute w-full h-full top-0 left-0 z-10' aria-label='link'></Link>
                                </div>
                            )
                        }

                        )
                    }
                </div>
            </div>
            <p className='border-b border-white/25 mt-8 mb-32'></p>
        </>

    )
}
