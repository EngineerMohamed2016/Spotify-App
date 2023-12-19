import { alt_img } from '@/utils/altImg';
import { formatNum } from '@/utils/formatNum';
import {  } from '@/types/common';
import React from 'react'
import { AboutPropsT } from '@/types/Artist';

export default function About({ artObj }: AboutPropsT) {
    const monthlyListener = formatNum(Number(artObj.stats.monthlyListeners));
    const biography = artObj.profile.biography.text; // may return null at end
 
    // test if there are images in sources arr.
    const imgUrl =
        artObj.visuals.gallery.items.length > 0
            ?
            artObj.visuals.gallery.items[0].sources[0].url
            :
            artObj.visuals.avatarImage.sources.length > 0
                ?
                artObj.visuals.avatarImage.sources[0].url
                :
                alt_img;

    return (
        <div>
            <p className='text-2xl font-bold mb-4 pt-8 text-white'>About</p>
            <div className='hover:scale-105 bg-img-sz bg-red-700 bg-no-repeat h-[400px] text-white flex items-end duration-300 rounded-lg' style={{ backgroundImage: `url(${imgUrl})` }}>
                <div className='bg-black/60 w-full p-3'>
                    <p className='mb-2'>{monthlyListener} monthly listeners</p>
                    <p>{biography && biography.slice(0, 200)}...</p>
                </div>
            </div>

        </div>
    )
}
