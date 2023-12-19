 import React from 'react'

export default function MusicBars() {
    return (
        <div className='w-fit flex h-[20px] gap-[1px] bars'>
            <p className='w-[2px] h-[17px] bg-green-400 music-bar-1'></p>
            <p className='w-[2px] h-[14px]  bg-green-400 music-bar-2'></p>
            <p className='w-[2px] h-[10px] bg-green-400 music-bar-3'></p>
            <p className='w-[2px] h-[12px] bg-green-400 music-bar-4'></p>
            <p className='w-[2px] h-[15px] bg-green-400 music-bar-5'></p>
        </div>
    )
}

