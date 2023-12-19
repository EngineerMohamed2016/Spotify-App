'use client'
import { useCustomContext } from '@/contextApi/Context';
import { fetchTrackByID } from '@/utils/fetchTrackByID';
import { formatTime } from '@/utils/formatTime';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useRef, useEffect } from 'react'
import { AiFillStepBackward, AiFillStepForward } from 'react-icons/ai'
import { BsFillPauseCircleFill, BsFillPlayCircleFill, BsRepeat1 } from 'react-icons/bs'
import { ImVolumeHigh, ImVolumeLow, ImVolumeMedium, ImVolumeMute } from 'react-icons/im'

let interval: NodeJS.Timer;
export default function AudioPlayer() {
    const { setActiveTrackId, setTrackIndex, trackIndex, globalSongsArr, trackUrl, setTrackUrl, firePlay, setFirePlay, trackDur, setTrackDur, artN, setArtN, traN, setTraN, picU, setPicU, artId, setArtId } = useCustomContext();
    const [play, setPlay] = useState(false);
    const [repeat, setRepeat] = useState(false);
    const [timeInpValue, setTimeInpValue] = useState(0);
    const [volumeInpValue, setVolumeInpValue] = useState(1);
    const [mute, setMute] = useState(false);
    const [preVol, setPreVol] = useState(0);


    const player = useRef<HTMLAudioElement>(null!);
    const timeSlider = useRef<HTMLInputElement>(null!);
    const volumeSlider = useRef<HTMLInputElement>(null!);


    const handlePlay = () => {
        // if no trackurl
        if (!trackUrl)
            return;

        player.current.volume = volumeInpValue;
        setPlay(true);
        player.current.play();
        setFirePlay(true)
    }

    const handlePause = () => {
        setPlay(false);
        player.current.pause();
        setFirePlay(false);
    }

    const handleRepeat = () => {
        if (repeat) {
            player.current.loop = false;
            setRepeat(false);
        }
        else {
            player.current.loop = true;
            setRepeat(true);
        }
    }

    useEffect(() => {
        player.current.src = trackUrl;
        player.current.currentTime = 0;
        setTimeInpValue(0);
    }, [trackUrl])


    useEffect(() => {
        if (firePlay)
            handlePlay();
        else
            handlePause();
    }, [firePlay, trackUrl])

    useEffect(() => {
        if (play)
            interval = setInterval(() => {
                setTimeInpValue(player.current?.currentTime);
                setVolumeInpValue(player.current?.volume);

                if (player.current.currentTime === player.current.duration) {
                    setPlay(!play);
                    setFirePlay(false);
                }
            }, 100);

        // clear interval
        if (!play)
            clearInterval(interval);
    }, [play]);


    const handleMute = () => {
        setMute(!mute);
        if (!mute) {
            setPreVol(volumeInpValue);
            player.current.volume = 0;
            setVolumeInpValue(0);
        }
        else {
            setVolumeInpValue(preVol);
            player.current.volume = preVol;
        }
    }


    // inputs handlers
    const handleTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (trackUrl === '')
            return
        player.current.currentTime = Number(e.target.value);
        setTimeInpValue(Number(e.target.value));
    }

    const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        player.current.volume = Number(e.target.value)
        setVolumeInpValue(Number(e.target.value));

        if (mute)
            setMute(!mute);

    }

    // forward button
    async function handleForward() {
        if (!globalSongsArr) return;

        var index = trackIndex;

        // modify index
        if (index === globalSongsArr.length - 1) {
            setTrackIndex(0);
            index = 0;
        }

        else {
            setTrackIndex(index + 1)
            index++;
        };

        if (globalSongsArr[index].prevLink)
            setTrackUrl(globalSongsArr[index].prevLink || '');

        else {
            // fetch track to get preview song link
            const trackById = await fetchTrackByID(globalSongsArr[index].trackId)
            setTrackUrl(trackById.tracks[0].preview_url); 
        }

        setActiveTrackId(globalSongsArr[index].trackId);
        setTrackDur(29000);
        setArtN(globalSongsArr[index].artN);
        setTraN(globalSongsArr[index].trackName);
        setPicU(globalSongsArr[index].img);
        setArtId(globalSongsArr[index].artId);
    }


    // back button
    async function handleBack() {
        if (!globalSongsArr) return;
        var index = trackIndex;

        // modify index
        if (index === 0) {
            setTrackIndex(globalSongsArr.length - 1);
            index = globalSongsArr.length - 1;
        }

        else {
            setTrackIndex(index - 1)
            index--;
        };

        if (globalSongsArr[index].prevLink)
            setTrackUrl(globalSongsArr[index].prevLink || '');

        else {
            // fetch track to get preview song link
            const trackById = await fetchTrackByID(globalSongsArr[index].trackId)
            setTrackUrl(trackById.tracks[0].preview_url); 
        }

        setActiveTrackId(globalSongsArr[index].trackId);
        setTrackDur(29000);
        setArtN(globalSongsArr[index].artN);
        setTraN(globalSongsArr[index].trackName);
        setPicU(globalSongsArr[index].img);
        setArtId(globalSongsArr[index].artId);
    }


    return (
        <div className='fixed z-[1003] left-0 bottom-0 w-screen h-20 bg-slate-900 border-t flex justify-around items-center'>
            {
                artN && traN && picU
                    ?
                    <div className='hidden md:flex gap-2 items-center justify-center  md:w-3/12 h-full text-white '>
                        <Image priority className='object-cover' width={50} height={50} src={picU} alt='deleted' />
                        <div>
                            <p className='text-md'>{traN}</p>
                            <Link prefetch={false} href={`/artist/${artId}`} className='text-xs underline text-white/70' aria-label='link'>{artN}</Link>
                        </div>
                    </div>
                    :
                    <p className='hidden md:block text-white text-xl md:w-3/12 text-center '>Currently, No Running Songs...</p>
            }

            <div className='flex flex-col gap-2 justify-center items-center md:w-7/12 '>
                <div className='text-[26px] flex gap-4'>
                    <button onClick={handleBack} className='text-white/50 hover:text-white duration-200' aria-label='mute'><AiFillStepBackward /></button>
                    {!play && <button onClick={handlePlay} className='text-white active:scale-110' aria-label='play'><BsFillPlayCircleFill /></button>}
                    {play && <button onClick={handlePause} className='text-white active:scale-110' aria-label='pause'><BsFillPauseCircleFill /></button>}
                    <button onClick={handleForward} className='text-white/50 hover:text-white duration-200' aria-label='forward'><AiFillStepForward /></button>
                    {<button onClick={handleRepeat} className={`${repeat ? 'text-white' : 'text-white/50'}  text-xl`} aria-label='repeat'><BsRepeat1 /></button>}
                </div>

                <div className='flex items-center gap-2'>
                    <p className='text-white text-xs text-center w-[40px]'>{formatTime(timeInpValue * 1000)}</p>
                    <label htmlFor='1'></label>
                    <input aria-label='time' id='1' type="range" value={timeInpValue} max={29.7} step={0.001} ref={timeSlider} onChange={handleTime} className='w-[150px] sm:w-[300px] h-[2px]' />
                    <p className='text-white text-xs text-center w-[40px]'>{`${trackDur === '--:--' ? '--:--' : formatTime(Number(trackDur))}`}</p>
                </div>
            </div>

            <div className='flex items-center gap-1 md:w-2/12'>
                <button onClick={handleMute} aria-label='mute'>
                    {mute && <ImVolumeMute className={'text-white'} />}
                    {
                        !mute && <>
                            <ImVolumeMute className={`${volumeInpValue <= 0 ? 'block' : 'hidden'} text-white`} />
                            <ImVolumeLow className={`${volumeInpValue <= 0.3 && volumeInpValue > 0 ? 'block' : 'hidden'} text-white`} />
                            <ImVolumeMedium className={`${volumeInpValue > 0.3 && volumeInpValue < 0.7 ? 'block' : 'hidden'} text-white`} />
                            <ImVolumeHigh className={`${volumeInpValue >= 0.7 ? 'block' : 'hidden'} text-white`} />
                        </>
                    }

                </button>
                <label htmlFor='2'></label>
                <input aria-label='volume' id='2' type="range" value={volumeInpValue} step={0.001} max={1} ref={volumeSlider} onChange={handleVolume} className='w-[45px] sm:w-[90px] h-[2px]' />
            </div>

            <audio src='' ref={player}></audio>
        </div>
    )
}


