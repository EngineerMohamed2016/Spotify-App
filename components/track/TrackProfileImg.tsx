import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { formatName } from '@/utils/ReturnTwoWords'
import { formatTime } from '@/utils/formatTime'
import { trackProfT } from '@/types/Track'

export default function TrackProfileImg({ trackObj }: trackProfT) {
    const trackName = formatName(trackObj.tracks[0].name);
    const trackImg = trackObj.tracks[0].album.images[0].url;
    const trackYear = trackObj.tracks[0].album.release_date.slice(0, 4);
    const trackDur = formatTime(trackObj.tracks[0].duration_ms);
    const artistName = formatName(trackObj.tracks[0].artists[0].name);
    const artistId = trackObj.tracks[0].artists[0].id;

    return (
        <div className='bg-slate-900 h-[250px] md:h-[320px] text-white flex items-end p-6'>
            <div className='flex gap-5 items-end'>
                <Image src={trackImg} priority className='w-[142px] h-[142px] md:w-[200px] md:h-[200px] object-cover duration-300 hover:scale-105' width={200} height={200} alt='delted' />
                <div className='flex flex-col gap-2'>
                    <p>Song</p>
                    <p className='text-3xl md:text-6xl font-bold'>{trackName}</p>
                    <div className='flex gap-1 items-center'>
                        <Image priority src={trackImg} className='w-[20px] h-[20px] rounded-full object-cover' width={20} height={20} alt='deleted' />
                        <Link prefetch={false} href={`/artist/${artistId}`} className='underline text-sm' aria-label='link'>{artistName}</Link>
                        <p className='text-white/70 text-xs sm:sm ml-3'>{trackYear} <span> | </span> {trackDur}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
