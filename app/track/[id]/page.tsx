import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import TrackProfileImg from '@/components/track/TrackProfileImg'
import TrackLyrics from '@/components/track/TrackLyrics'
import PlayButton from '@/components/track/PlayButton'
import { options } from '@/utils/options'
import ReachedLimit from '@/components/ReachedLimit'

export const metadata = {
  title: 'Track',
  description: 'Spotify Songs',
}

const fetchTrack = async (id: string) => {
  const url = `https://spotify81.p.rapidapi.com/tracks?ids=${id}`;
  try {
    const res = await fetch(url, options);
    return res.json();

  } catch (e) {
    return { e };
  }
}

const fetchLyrics = async (id: string) => {
  const url = `https://spotify81.p.rapidapi.com/track_lyrics?id=${id}`;
  try {
    const res = await fetch(url, options);
    return res.json();

  } catch (e) {
    return { e };
  }
}

export default async function Page({ params }: { params: { id: string } }) {
  // fetching in parallel
  const [trackObj, lyricsObj] = await Promise.all([fetchTrack(params.id), fetchLyrics(params.id)]);

  // test error
  if (trackObj.e || lyricsObj.e)
    return <div className='text-4xl text-white'>Failed to load from Api</div>

  // test if api is still active
  if (trackObj.message)
    return <ReachedLimit />


  const trackImg = trackObj.tracks[0].album.images[0].url;
  const artistName = trackObj.tracks[0].artists[0].name;
  const artistId = trackObj.tracks[0].artists[0].id;

  return (
    <div className='px-5'>
      <TrackProfileImg trackObj={trackObj} />

      <PlayButton trackObj={trackObj} trackId={params.id} />

      <TrackLyrics lyricsObj={lyricsObj} />

      <div className='flex gap-4 items-center hover:bg-white/10 bg-white/5 duration-00 p-2 rounded-lg mb-12 mt-10'>
        <Image src={trackImg} className='rounded-full w-[85px] h-[85px] object-cover' width={85} height={85} alt='deleted' />
        <div className='text-white'>
          <p className='text-sm text-white/60'>Artist</p>
          <Link prefetch={false} href={`/artist/${artistId}`} className='underline' aria-label='link'>{artistName}</Link>
        </div>
      </div>
      <p className='border-b border-white/25 mt-8 mb-32'></p>
    </div>
  )
}
