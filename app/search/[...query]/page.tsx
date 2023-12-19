'use client'
import React, { useEffect } from 'react'
import Albums from '@/components/search/Albums';
import Artists from '@/components/search/Artists';
import { notFound } from 'next/navigation';
import FilterLinks from '@/components/search/FilterLinks';
import TopResult from '@/components/search/TopResult';
import SongsWithScroll from '@/components/search/SongsWithScroll';
import Songs from '@/components/search/Songs';
import { useCustomContext } from '@/contextApi/Context';
import useSWR from 'swr'
import Loading from '@/app/loading';
import { options } from '@/utils/options';
import { formatName } from '@/utils/ReturnTwoWords';
import { formatTime } from '@/utils/formatTime';
import { AlbumTracksType } from '@/types/common';
import { SearchPropsT } from '@/types/Search';
import ReachedLimit from '@/components/ReachedLimit';



export default function Page({ params }: SearchPropsT) {
    const { setTrackIndex, loading, setLoading, setQuery, setSearchItem, searchItem, setGlobalSongsArr } = useCustomContext();

    const fetcher = (url: string) => fetch(url, options).then(res => res.json())
    const { data, error, isLoading } = useSWR(`https://spotify81.p.rapidapi.com/search?q=${searchItem}&type=multi&offset=0&limit=10&numberOfTopResults=5`, fetcher)

    useEffect(() => {
        if (!error && !isLoading && !data.message) {
            setGlobalSongsArr(reducing(data.tracks));
            setTrackIndex(0);
        }
    }, [data])

    // use effect to remove music loading, and update search bar and searchItem after refreshing. 
    useEffect(() => {
        setLoading(false);
        setSearchItem(decodeURI(params.query[0]));
        setQuery(params.query.reduce((t: any, param: any, i: any) => {
            if (params.query.length - 1 === i)
                t = `${t}${param}`;
            else
                t = `${t}${param}/`;
            return t;
        }, ''));
    }, []);



    // test error
    if (error) return <div>failed to load</div>

    // wait removing music loading + fetch data
    if (loading || isLoading) return <Loading />;


    // test if api still active
    if (data.message)
        return <ReachedLimit />

    const tracksArr = data.tracks;
    const artistsArr = data.artists.items;
    const albumsArr = data.albums.items;


    if (tracksArr.length < 1 || artistsArr.length < 1 || albumsArr.length < 1)
        return (
            <div className='text-center mt-10'>
                <p className='text-white text-2xl font-bold'>No results found for ‘{searchItem}’</p>
                <p className='text-white/70 mt-2'>Please make sure your words are spelled correctly, or use fewer or different keywords.</p>
            </div>
        )


    const topSongsArr = reducing(tracksArr);

    if (params.query.length === 0)
        return

    if (params.query.length > 2)
        notFound();

    if (params.query.length === 1)
        return (
            <div>
                <FilterLinks artistName={params.query[0]} />

                <div>
                    <div className='flex flex-col md:flex-row gap-8'>
                        <TopResult artistsArr={artistsArr} />
                        <SongsWithScroll topSongsArr={topSongsArr} />
                    </div>
                    <Artists artistsArr={artistsArr} />
                    <Albums albumsArr={albumsArr} />
                    <p className='border-b border-white/25 mt-8 mb-32'></p>
                </div>
            </div>
        )

    if (params.query[1] === 'artists')
        return (
            <div>
                <FilterLinks artistName={params.query[0]} />
                <Artists artistsArr={artistsArr} />
                <p className='border-b border-white/25 mt-8 mb-32'></p>
            </div>
        )

    if (params.query[1] === 'albums')
        return (
            <div>
                <FilterLinks artistName={params.query[0]} />
                <Albums albumsArr={albumsArr} />
                <p className='border-b border-white/25 mt-8 mb-32'></p>
            </div>
        )

    if (params.query[1] === 'songs')
        return (
            <>
                <FilterLinks artistName={params.query[0]} />
                <Songs topSongsArr={topSongsArr} />
                <p className='border-b border-white/25 mt-8 mb-32'></p>
            </>
        )

    else notFound()
}


type red_obj_Search = {
    data: {
        id: string;
        name: string;
        artists: {
            items: {
                profile: {
                    name: string;
                }
                uri: string;
            }[]
        }
        duration: {
            totalMilliseconds: number;
        }
        albumOfTrack: {
            coverArt: {
                sources: {
                    url: string;
                }[]
            }
            name: string;
            uri: string;
        }
    };
}

type red_Arr_Search = red_obj_Search[];

// building tracks objs arr // no PreviewLink with imgUrl
function reducing(arr: red_Arr_Search) {
    return arr.reduce((arr: AlbumTracksType, obj: red_obj_Search) => {
        const trackId = obj.data.id;
        const trackName = formatName(obj.data.name);
        const artN = formatName(obj.data.artists.items[0].profile.name);
        const artId = obj.data.artists.items[0].uri.slice(15);
        const dur = formatTime(obj.data.duration.totalMilliseconds);
        const img = obj.data.albumOfTrack.coverArt.sources[2].url;
        const albumName = formatName(obj.data.albumOfTrack.name);
        const albumId = obj.data.albumOfTrack.uri.slice(14);

        arr.push({ trackId, trackName, artN, artId, dur, img, albumName, albumId });
        return arr;
    }, [])
}