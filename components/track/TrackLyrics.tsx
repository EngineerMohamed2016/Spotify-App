import { lyricsT } from '@/types/Track';
import React from 'react'

export default function TrackLyrics({ lyricsObj }: lyricsT) {

    if (lyricsObj.error) return <p className='text-white text-white/80'>Lyrics Not Available</p>

    const lyrics = lyricsObj.lyrics && lyricsObj.lyrics.lines; // arr of lines

    return (
        <div>
            <p className='text-2xl font-bold mb-4 mt-4 text-white'>Lyrics</p>
            <div className='text-white/80 mb-7 text-md'>
                {
                    lyrics.map((obj, i: number) => <p key={i}>{obj.words}</p>)
                }
            </div>
        </div>
    )
}
