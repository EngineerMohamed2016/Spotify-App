'use client'
import React, { useState } from 'react'
import { BsFillPauseFill, BsPlayFill } from 'react-icons/bs'
import Image from 'next/image';
import Link from 'next/link';
import { useCustomContext } from '@/contextApi/Context';
import { fetchTrackByID } from '@/utils/fetchTrackByID';
import { AlbumTracksType,  } from '@/types/common';
import { playerObjType } from '@/types/Album';

export default function SongsWithScroll({ topSongsArr }: {topSongsArr: AlbumTracksType}) {
    const [prevLink, setPrevLink] = useState(''); // store link after fetching, not to fetch again the same link...

    const { setTrackIndex, setTrackUrl, firePlay, setFirePlay, setTrackDur, setArtN, setTraN, setPicU, setArtId, activeTrackId, setActiveTrackId } = useCustomContext();


    async function handlePlay(obj: playerObjType) {
        setActiveTrackId(obj.trackId);
        setTrackDur(29000);
        setArtN(obj.artN);
        setTraN(obj.trackName);
        setPicU(obj.imgUrl);
        setArtId(obj.artId);
        setTrackIndex(obj.index);

        // if link of song sound was fetched then no new fetch
        if (prevLink.length !== 0 && obj.trackId === activeTrackId) {
            setFirePlay(true);
            return;
        }

        // fetch track to get preview song link
        const trackById = await fetchTrackByID(obj.trackId)
        setPrevLink(trackById.tracks[0].preview_url); // a copy
        setTrackUrl(trackById.tracks[0].preview_url); // first copy
        setFirePlay(true);
    }

    function handlePause() {
        setFirePlay(false);
    }

    return (
        <div className='w-full md:w-1/2'>
            <p className='text-2xl text-white font-bold mb-4'>Songs</p>
            <ul className='text-white bg-white/5 rounded-lg h-[226px] overflow-y-auto' >
                {
                    topSongsArr.map((obj, i: number) => {

                        const trackId = obj.trackId
                        const trackName = obj.trackName;
                        const artN = obj.artN;
                        const artId = obj.artId;
                        const trackDur = obj.dur;
                        const imgUrl = obj.img; // image url

                        const playerObj = { artN, trackName, imgUrl, trackId, artId, index: i }


                        return (
                            <li key={i} className='songs-li flex justify-between items-center mb-2 hover:bg-white/20 px-5 py-3 rounded'>
                                <div className='flex items-center w-2/3 md:w-1/2 gap-5'>
                                    <div className="relative">
                                        <Image priority src={imgUrl} className='w-[40px] h-[40px]' width={40} height={40} alt='deleted' />
                                        {/* After remove hover on li, show pause button because active*/}
                                        {
                                            trackId === activeTrackId && firePlay &&
                                            <button onClick={handlePause} aria-label='pause' className='hide-icon-w-h bg-black/40 absolute w-full h-full left-0 top-0'><BsFillPauseFill className='center-in text-xl cursor-pointer' /></button>

                                        }


                                        {/* during hovering on li */}
                                        {
                                            trackId === activeTrackId && firePlay
                                                ?
                                                <button onClick={handlePause} aria-label='pause' className='show-icon-w-h hidden bg-black/40 absolute w-full h-full left-0 top-0'><BsFillPauseFill className='center-in text-xl cursor-pointer' /></button>
                                                :
                                                <button onClick={() => handlePlay(playerObj)} aria-label='play' className='show-icon-w-h hidden bg-black/40 absolute w-full h-full left-0 top-0'><BsPlayFill className=' center-in text-xl cursor-pointer' /></button>

                                        }
                                    </div>

                                    <div>
                                        <Link prefetch={false} href={`/track/${trackId}`} className='text-sm hover:underline block' aria-label='link'>{trackName}</ Link>
                                        <Link prefetch={false} href={`/artist/${artId}`} className='text-xs hover:underline' aria-label='link'>{artN}</Link>
                                    </div>

                                </div>
                                <p className='text-sm text-white/50'>{trackDur}</p>
                            </li>
                        )
                    })
                }
            </ul >


        </div>
    )
}
