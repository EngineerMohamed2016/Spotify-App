'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { BsFillPauseCircleFill, BsFillPlayCircleFill } from 'react-icons/bs'
import { useCustomContext } from '@/contextApi/Context'
import { fetchTrackByID } from '@/utils/fetchTrackByID'
import { formatName } from '@/utils/ReturnTwoWords'
import { TopResType } from '@/types/Search'



export default function TopResult({ artistsArr }: TopResType) {
    const [prevLink, setPrevLink] = useState(''); // store link after fetching, not to fetch again the same link...


    const { setTrackIndex, globalSongsArr, setTrackUrl, firePlay, setFirePlay, setTrackDur, setArtN, setTraN, setPicU, setArtId, activeTrackId, setActiveTrackId } = useCustomContext();

    // come from page
    const artN = formatName(artistsArr[0].data.profile.name);
    const artId = artistsArr[0].data.uri.slice(15);
    const artImg = artistsArr[0].data.visuals.avatarImage.sources[0].url;


    async function handleClick() {
        setActiveTrackId(globalSongsArr[0].trackId);
        setTrackDur(29000);
        setArtN(artN);
        setTraN(globalSongsArr[0].trackName);
        setPicU(globalSongsArr[0].img); // first track image
        setArtId(artId);
        setTrackIndex(0);

        // if link of song sound was fetched then no new fetch
        if (prevLink.length !== 0 && globalSongsArr[0].trackId === activeTrackId) {
            setFirePlay(!firePlay);
            return;
        }

        // fetch track to get preview song link
        const trackById = await fetchTrackByID(globalSongsArr[0].trackId)
        setPrevLink(trackById.tracks[0].preview_url); // a copy
        setTrackUrl(trackById.tracks[0].preview_url); // first copy
        setFirePlay(true);
    }

    return (
        <div className='w-full md:w-1/2'>
            <p className='text-2xl text-white font-bold mb-4'>Top result</p>
            <div className='top-artist bg-white/5 hover:bg-white/20 duration-500 p-5 rounded-lg text-white relative flex flex-col gap-5'>
                <Image src={artImg} priority className='h-[90px] rounded-full object-cover' width={90} height={90} alt='deleted' />
                <p className='text-2xl font-bold'>{artN}</p>
                <p>Artist</p>
                {       
                    firePlay && activeTrackId === globalSongsArr[0].trackId ?
                        <button onClick={handleClick} aria-label='pause' className='play-top-artist absolute duration-200 z-10'><p className='absolute w-1/2 h-1/2 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-black'></p> <BsFillPauseCircleFill className='relative hover:scale-110 text-4xl text-lime-500' /></button>
                        :
                        <button onClick={handleClick} aria-label='play' className='play-top-artist absolute duration-200 z-10'><p className='absolute w-1/2 h-1/2 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-black'></p> <BsFillPlayCircleFill className='relative hover:scale-110 text-4xl text-lime-500' /></button>
                }
                <Link prefetch={false} href={`/artist/${artId}`} className='absolute top-0 left-0 w-full h-full' aria-label='link'></Link>
            </div>
        </div>
    )
}
