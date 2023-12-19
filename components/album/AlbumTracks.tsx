'use client'
import React, { useEffect } from 'react'
import { BsFillPauseFill, BsPlayFill } from 'react-icons/bs'
import MusicBars from '@/components/MusicBars';
import Link from 'next/link';
import { BiTime } from 'react-icons/bi'
import { useCustomContext } from '@/contextApi/Context';
import { AlbumTracksObjType, AlbumTracksType } from '@/types/common';
import { alb_Arr_Art, playerObjType } from '@/types/Album';
import { formatName } from '@/utils/ReturnTwoWords';
import { formatTime } from '@/utils/formatTime';
import temp from 'public/temp.png'


export default function AlbumsTracks({ data }: { data: any }) {
    const { setGlobalSongsArr, setTrackIndex, setTrackUrl, firePlay, setFirePlay, setTrackDur, setArtN, setTraN, setPicU, setArtId, activeTrackId, setActiveTrackId } = useCustomContext();

    const albumTracks: AlbumTracksType = reducing(data.albums[0].tracks.items);

    useEffect(() => {
        setGlobalSongsArr(reducing(data.albums[0].tracks.items));
        setTrackIndex(0);
    }, [])

    const handlePlay = async (obj: playerObjType) => {
        setActiveTrackId(obj.trackId);
        setTrackDur(29000);
        setArtN(obj.artN);
        setTraN(obj.trackName);
        setPicU(obj.imgUrl);
        setArtId(obj.artId)
        setTrackUrl(obj.prevLink || '')
        setFirePlay(true);
        setTrackIndex(obj.index);
    }

    const handlePause = () => setFirePlay(false);

    return (
        <div>
            <div className='text-white/70 flex justify-between px-5 py-1 mb-4 mt-5 border-b border-white/25 '>
                <p># <span className='ml-[26px]'>Title</span></p>
                <BiTime className='text-2xl' />
            </div>
            < ul className='text-white' >
                {
                    albumTracks.map((obj: AlbumTracksObjType, i: number) => {

                        const trackId = obj.trackId;
                        const trackName = obj.trackName;
                        const artN = obj.artN;
                        const artId = obj.artId;
                        const trackDur = obj.dur;
                        const prevLink = obj.prevLink;
                        const imgUrl = obj.img; // static img
                        const playerObj = { artN, trackName, trackId, prevLink, artId, imgUrl, index: i }


                        return (
                            <li key={i} className='flex justify-between items-center mb-2 px-5 py-3 songs-li hover:bg-white/20 rounded'>
                                <div className='flex items-center w-full md:w-1/3 gap-5'>
                                    <div className="w-[20px] relative">
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
                                                <button onClick={handlePause} aria-label='pause' className='show-icon-w-h hidden'><BsFillPauseFill className='center-in text-xl cursor-pointer' /></button>
                                                :
                                                <button onClick={() => handlePlay(playerObj)} aria-label='play' className='show-icon-w-h hidden'><BsPlayFill className=' center-in text-xl cursor-pointer' /></button>
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


function reducing(arr: alb_Arr_Art) {
    return arr.reduce((arr: AlbumTracksType, obj) => {
        const trackId = obj.id;
        const trackName = formatName(obj.name);
        const artN = formatName(obj.artists[0].name);
        const artId = obj.artists[0].id;
        const dur = formatTime(Number(obj.duration_ms));
        const prevLink = obj.preview_url;
        const img = temp;

        arr.push({ trackId, trackName, artN, artId, dur, prevLink, img });
        return arr;
    }, [])
}