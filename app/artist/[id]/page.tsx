import About from '@/components/artist/About';
import Discography from '@/components/artist/Discography';
import FansLike from '@/components/artist/FansLike';
import PopularTracks from '@/components/artist/PopularTracks';
import ProfileImg from '@/components/artist/ProfileImg';
import { options } from '@/utils/options';
import { PagePropsT, } from '@/types/common';
import React from 'react'
import ReachedLimit from '@/components/ReachedLimit';

export const metadata = {
    title: 'Artist',
    description: 'Spotify Artist',
}

const fetchArtist = async (id: string) => {
    const url = `https://spotify81.p.rapidapi.com/artist_overview?id=${id}`;
    try {
        const res = await fetch(url, options);
        return res.json();

    } catch (e) {
        return { e };
    }
}

export default async function Page({ params }: PagePropsT) {
    const data = await fetchArtist(params.id);

    // test error
    if (data.e) return <div>failed to load from Api</div>

    // test if api still active
    if (data.message)
        return <ReachedLimit />

    // now data fetched successfully
    const artObj = data.data.artist; // obj of artist

    return (
        <div className='px-5'>
            <ProfileImg artObj={artObj} />
            <PopularTracks artObj={artObj} data={data} />
            <Discography artObj={artObj} />
            <FansLike artObj={artObj} />
            <About artObj={artObj} />
            <p className='border-b border-white/25 mt-8 mb-32'></p>
        </div>
    )
}




