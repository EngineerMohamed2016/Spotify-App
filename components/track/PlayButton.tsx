'use client'
import { playPropsT } from '@/types/Track';
import { useCustomContext } from '@/contextApi/Context';
import { formatName } from '@/utils/ReturnTwoWords';
import React from 'react'
import { BsFillPauseCircleFill, BsFillPlayCircleFill } from 'react-icons/bs'



export default function PlayButton({ trackObj, trackId }: playPropsT) {
    const { setTrackIndex, setGlobalSongsArr, setTrackUrl, firePlay, setFirePlay, setTrackDur, setArtN, setTraN, setPicU, setArtId, activeTrackId, setActiveTrackId } = useCustomContext();

    const trackName = formatName(trackObj.tracks[0].name);
    const trackImg = trackObj.tracks[0].album.images[0].url;
    const trackUrl = trackObj.tracks[0].preview_url;
    const artistName = formatName(trackObj.tracks[0].artists[0].name);
    const artistId = trackObj.tracks[0].artists[0].id;


    const handleClick = () => {
        // reset GlobalSongsArr
        setGlobalSongsArr([]);
        setTrackIndex(0);
        // current track
        setTrackUrl(trackUrl);
        setTrackDur(29000);
        setArtN(artistName);
        setTraN(trackName);
        setPicU(trackImg);
        setArtId(artistId);

        if (trackId === activeTrackId)
            setFirePlay(!firePlay);
        else
            setFirePlay(true);
        setActiveTrackId(trackId);
    }


    return (
        <div>
            {
                trackId === activeTrackId && firePlay ?
                    <button onClick={handleClick} aria-label='pause' className='relative mt-3'><p className='absolute w-1/2 h-1/2 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-black'></p> <BsFillPauseCircleFill className='relative z-20 hover:scale-110 text-5xl text-lime-500 duration-200' /></button>
                    :
                    <button onClick={handleClick} aria-label='play' className='relative mt-3'><p className='absolute w-1/2 h-1/2 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-black'></p> <BsFillPlayCircleFill className='relative z-20 hover:scale-110 text-5xl text-lime-500 duration-200' /></button>
            }
        </div>
    )
}
