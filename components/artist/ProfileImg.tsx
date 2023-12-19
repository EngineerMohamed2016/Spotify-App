import { formatName } from '@/utils/ReturnTwoWords';
import { alt_img } from '@/utils/altImg';
import { formatNum } from '@/utils/formatNum';
import {  } from '@/types/common';
import Image from 'next/image';
import React from 'react'
import { VscVerifiedFilled } from 'react-icons/vsc'
import { profileImgPropsT } from '@/types/Artist';

export default function ProfileImg({ artObj }: profileImgPropsT) {
    const imgUrl =
        artObj.visuals.headerImage
            ?
            artObj.visuals.headerImage.sources[0].url
            :
            artObj.visuals.avatarImage
                ?
                artObj.visuals.avatarImage.sources[0].url
                :
                alt_img;



    const rawColor = artObj.visuals.headerImage ?
        artObj.visuals.headerImage.extractedColors.colorRaw.hex
        :
        artObj.visuals.avatarImage
            ?
            artObj.visuals.avatarImage.extractedColors.colorRaw.hex
            :
            '#000000'

    const monthlyListener = formatNum(Number(artObj.stats.monthlyListeners));
    const verified = artObj.profile.verified;
    const artN = formatName(artObj.profile.name);

    // if no img like elissa big size
    if (!artObj.visuals.headerImage && artObj.visuals.avatarImage) {

        return (
            <div className='h-[400px] relative p-5' style={{ backgroundColor: rawColor }}>
                <div className='flex flex-col sm:flex-row justify-center sm:justify-start items-center h-full gap-3'>

                    <Image src={imgUrl} priority className='rounded-full w-[180px] h-[180px] md:w-[250px] md:h-[250px]' width={250} height={250} alt='deleted' />
                    <div className='sm:h-full flex flex-col justify-start sm:justify-center sm:p-10 text-center sm:text-start'>
                        {
                            verified &&
                            <div className='flex items-center justify-center sm:justify-start text-white mb-2'>
                                <VscVerifiedFilled className='text-3xl text-blue-500' />
                                Verified Artist
                            </div>
                        }
                        <p className='text-white text-2xl sm:text-5xl lg:text-7xl font-bold mb-2'>{artN}</p>
                        <p className='text-white text-md sm:text-lg'>{monthlyListener} monthly listeners</p>
                    </div>

                </div>
            </div>
        )
    }

    return (
        <div className='bg-img-sz bg-fixed bg-blue-900 h-[400px] relative' style={{ backgroundImage: `url(${imgUrl})` }}>
            <div className='w-full h-full absolute top-0 bg-black/10'></div>
            <div className='h-full flex flex-col justify-end p-10'>
                {
                    verified &&
                    <div className='flex items-center text-white text-sm mb-2'>
                        <VscVerifiedFilled className='text-3xl text-blue-500' />
                        Verified Artist
                    </div>
                }
                <p className='text-white text-6xl font-bold mb-8'>{artN}</p>
                <p className='text-white text-lg'>{monthlyListener} monthly listeners</p>
            </div>
        </div>
    )
}
