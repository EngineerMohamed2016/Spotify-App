'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { BsFillPauseCircleFill, BsFillPlayCircleFill } from 'react-icons/bs'
import { useCustomContext } from '@/contextApi/Context'

export default function Recommend({ recommended }: { recommended: any }) {
    const { setTrackIndex, setGlobalSongsArr, setTrackUrl, firePlay, setFirePlay, setTrackDur, setArtN, setTraN, setPicU, setArtId, activeTrackId, setActiveTrackId } = useCustomContext();

    useEffect(() => {
        setGlobalSongsArr(recommended);
        setTrackIndex(0);
    }, []);


    const handleClick = (obj: any) => {
        setTrackUrl(obj.prevLink);
        setTrackIndex(obj.index)
        setTrackDur(obj.dur);
        setArtN(obj.artN);
        setTraN(obj.trackName);
        setPicU(obj.img);
        setArtId(obj.artId);

        if (obj.trackId === activeTrackId)
            setFirePlay(!firePlay);
        else
            setFirePlay(true);
        setActiveTrackId(obj.trackId);
    }

    return (
        <>
            <div className='px-5 pb-5'>
                <p className='md:hidden w-full h-[50px]'></p>
                <p className='text-2xl font-bold mb-4 pt-8 text-white'>Recommended <span>&#128153;</span></p>
                <div className='text-center md:text-left flex flex-wrap justify-center md:justify-start gap-5 mt-5'>
                    {
                        recommended.map((obj: any) =>
                            <div key={obj._id} className='p-4 w-[160px] lg:w-[180px] h-[240px] rounded-md text-white relative duration-300 bg-white/5 hover:bg-white/20 disco'>
                                <div className='relative'>
                                    <Image src={obj.img} priority className='object-cover mx-auto h-[130px] rounded-full' width={130} height={130} alt='deleted' />
                                    {
                                        obj.trackId === activeTrackId ?
                                            firePlay ? <button onClick={() => handleClick(obj)} aria-label='pause' className='absolute right-[10px] bottom-[0px] duration-200'><p className='absolute w-1/2 h-1/2 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-black'></p> <BsFillPauseCircleFill className='relative z-20 hover:scale-110 text-4xl text-lime-500' /></button> : <button onClick={() => handleClick(obj)} className='play-disco absolute right-[10px] bottom-[0px] duration-200'><p className='absolute w-1/2 h-1/2 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-black'></p> <BsFillPlayCircleFill className='relative z-20 hover:scale-110 text-4xl text-lime-500' /></button>
                                            :
                                            <button onClick={() => handleClick(obj)} aria-label='play' className=' play-disco absolute right-[10px] bottom-[0px] duration-200'><p className='absolute w-1/2 h-1/2 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-black'></p> <BsFillPlayCircleFill className='relative z-20 hover:scale-110 text-4xl text-lime-500' /></button>
                                    }
                                </div>
                                <p className=' font-semibold mt-3 mb-1 sm:text-lg'>{obj.trackName}</p>
                                <p className='text-white/80 text-md sm:text-sm'>{obj.artN}</p>
                                <p className='text-white/60 text-sm sm:text-xs'>{obj.type}</p>
                                <Link prefetch={false} href={`track/${obj.trackId}`} className='block absolute w-full h-full top-0 left-0 z-10' aria-label='link'></Link>
                            </div>
                        )
                    }
                </div>
            </div>

            <p className='border-b border-white/25 mt-8 mb-12'></p>
        </>
    )
}
