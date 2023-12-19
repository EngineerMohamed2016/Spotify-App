'use client'
import React, { useState, useEffect } from 'react'
import { BsFillPauseFill, BsPlayFill } from 'react-icons/bs'
import Image from 'next/image';
import MusicBars from '@/components/MusicBars';
import Link from 'next/link';
import { useCustomContext } from '@/contextApi/Context';
import { fetchTrackByID } from '@/utils/fetchTrackByID';
import { AlbumTracksType } from '@/types/common';
import { playerObjType } from '@/types/Album';
import { red_Arr_Art } from '@/types/Artist';
import { formatName } from '@/utils/ReturnTwoWords';
import { formatTime } from '@/utils/formatTime';
import { formatNum } from '@/utils/formatNum';


export default function PopularTracks({ artObj, data }: any) {
    const [prevLink, setPrevLink] = useState(''); // store link after fetching, not to fetch again the same link...

    const { setGlobalSongsArr, setTrackIndex, setTrackUrl, firePlay, setFirePlay, setTrackDur, setArtN, setTraN, setPicU, setArtId, activeTrackId, setActiveTrackId } = useCustomContext();

    const [more, setMore] = useState(false);
    
    useEffect(() => {
            setGlobalSongsArr(reducing(data.data.artist.discography.topTracks.items))
            setTrackIndex(0);
    }, [])

    const handlePlay = async (obj: playerObjType) => {
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

    // tracks Arr
    const tracksArr = reducing(artObj.discography.topTracks.items);

    // tracks arr || copy by value || not mutable
    const tracksArr2 = [...tracksArr];

    // see more or see less
    tracksArr2.length = more ? tracksArr.length : Math.floor(tracksArr.length / 2);

    return (
        <div>
            <p className='text-2xl text-white font-bold mb-4 pt-8'>Popular</p>
            < ul className='text-white' >
                {
                    tracksArr2.map((obj, i: number) => {

                        const trackId = obj.trackId;
                        const trackName = obj.trackName;
                        const imgUrl = obj.img;
                        const dur = obj.dur;
                        const playCount = obj.playCount;
                        const artId = obj.artId;
                        const artN = obj.artN;
                        const playerObj = { trackId, trackName, imgUrl, artId, artN, index: i }

                        return (
                            <li key={i} className='flex justify-between items-center mb-2 songs-li hover:bg-white/20 px-5 py-2 rounded'>
                                <div className='flex items-center w-[2/3] md:w-1/3 gap-5'>
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
                                                <button onClick={handlePause} aria-label='pause' className='show-icon-w-h hidden'><BsFillPauseFill className='center-in text-xl cursor-pointer' /></button>
                                                :
                                                <button onClick={() => handlePlay(playerObj)} aria-label='play' className='show-icon-w-h hidden'><BsPlayFill className=' center-in text-xl cursor-pointer' /></button>
                                        }
                                    </div>
                                    <Image src={imgUrl} priority className='!w-[45px] !h-[45px]' width={45} height={45} alt='deleted' />
                                    <Link prefetch={false} href={`/track/${trackId}`} className='text-sm hover:underline' aria-label='link'>{trackName}</ Link>
                                </div>
                                <p className='hidden md:block text-white/50 text-sm count-profile'>{playCount}</p>
                                <p className='text-sm text-white/50'>{dur}</p>
                            </li>
                        )
                    })
                }
            </ul >

            <button onClick={() => setMore(!more)} aria-label='more less' className='text-white/70 hover:text-white text-lg px-5 transition-colors mt-5'>{more ? 'See less' : 'See more'}</button>
        </div>
    )
}



// building tracks objs arr // no PreviewLink with imgUrl
function reducing(arr: red_Arr_Art) {
    return arr.reduce((arr: AlbumTracksType, obj) => {
        const trackId = obj.track.id;
        const trackName = formatName(obj.track.name);
        const artN = formatName(obj.track.artists.items[0].profile.name);
        const artId = obj.track.artists.items[0].uri.slice(15);
        const dur = formatTime(Number(obj.track.duration.totalMilliseconds));
        const img = obj.track.album.coverArt.sources[0].url;
        const playCount = formatNum(Number(obj.track.playcount));

        arr.push({ trackId, trackName, artN, artId, dur, img, playCount });
        return arr;
    }, [])
}