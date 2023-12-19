'use client'
import React, { useState } from 'react'
import { BsFillPauseFill, BsPlayFill } from 'react-icons/bs'
import Image from 'next/image';
import MusicBars from '@/components/MusicBars';
import Link from 'next/link';
import { fetchTrackByID } from '@/utils/fetchTrackByID';
import { useCustomContext } from '@/contextApi/Context';
import { AlbumTracksType,  } from '@/types/common';
import { playerObjType } from '@/types/Album';



export default function Songs({ topSongsArr }: { topSongsArr: AlbumTracksType }) {
    const [prevLink, setPrevLink] = useState(''); // store link after fetching, not to fetch again the same link...

    const { setTrackIndex, setTrackUrl, firePlay, setFirePlay, setTrackDur, setArtN, setTraN, setPicU, setArtId, activeTrackId, setActiveTrackId } = useCustomContext();


    async function handlePlay(obj: playerObjType) {
        setActiveTrackId(obj.trackId);
        setTrackDur(29000);
        setArtN(obj.artN);
        setTraN(obj.trackName);
        setPicU(obj.imgUrl);
        setArtId(obj.artId)
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
        <div>
            <p className='text-2xl font-bold mb-4 pt-8 text-white'>Songs</p>
            < ul className='text-white' >
                {
                    topSongsArr.map((obj, i: number) => {

                        const trackId = obj.trackId
                        const trackName = obj.trackName;
                        const artN = obj.artN;
                        const artId = obj.artId;
                        const trackDur = obj.dur;
                        const imgUrl = obj.img; // image url 
                        const albumName = obj.albumName;
                        const albumId = obj.albumId;
                        const playerObj = { artN, trackName, imgUrl, trackId, artId, index: i }

                        return (
                            <li key={i} className='flex justify-between items-center mb-2 px-5 py-2 songs-li hover:bg-white/20 rounded'>
                                <div className='flex items-center w-full md:w-1/3 gap-5'>
                                    <div className="w-[20px] relative text-center">
                                        {/* when no hover */}
                                        {
                                            trackId === activeTrackId && firePlay
                                                ?
                                                <MusicBars />
                                                :
                                                <span className='hide-icon-w-h'>{1 + i}</span>
                                        }

                                        {/* during hovering on li */}
                                        {
                                            trackId === activeTrackId && firePlay
                                                ?
                                                <button onClick={handlePause} className='show-icon-w-h hidden'><BsFillPauseFill className='center-in text-xl cursor-pointer' /></button>
                                                :
                                                <button onClick={() => handlePlay(playerObj)} className='show-icon-w-h hidden'><BsPlayFill className=' center-in text-xl cursor-pointer' /></button>
                                        }
                                    </div>

                                    <Image src={imgUrl} priority className='!w-[40px] !h-[40px]' width={40} height={40} alt='deleted' />
                                    <div>
                                        <Link prefetch={false} href={`/track/${trackId}`} className='text-sm hover:underline block' aria-label='link'>{trackName}</ Link>
                                        <Link prefetch={false} href={`/artist/${artId}`} className='text-xs hover:underline' aria-label='link'>{artN}</Link>
                                    </div>
                                </div>
                                <Link prefetch={false} href={`/album/${albumId}`} className='hidden md:inline-block text-white/50 text-sm count-profile hover:underline hover:text-white' aria-label='link'>{albumName}</Link>
                                <p className='text-sm text-white/50'>{trackDur}</p>
                            </li>
                        )
                    })
                }
            </ul >

        </div>
    )
}
