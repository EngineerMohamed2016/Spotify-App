import { PagePropsT } from '@/types/common';
import AlbumProfileImg from '@/components/album/AlbumProfileImg';
import AlbumsTracks from '@/components/album/AlbumTracks';
import { options } from '@/utils/options';
import React from 'react'
import ReachedLimit from '@/components/ReachedLimit';

export const metadata = {
  title: 'Album',
  description: 'Spotify Album',
}

const fetchAlbum = async (id: string) => {
  const url = `https://spotify81.p.rapidapi.com/albums?ids=${id}`;
  try {
    const res = await fetch(url, options);
    return res.json();

  } catch (e) {
    return { e };
  }
}

export default async function Page({ params }: PagePropsT) {
  const data = await fetchAlbum(params.id);


  // test if there is an error.
  if (data.e) return <div>failed to load</div>

  // test if the Api is still active.
  if (data.message)
    return <ReachedLimit />



  // now data successfully fetched.
  const album = data.albums[0];
  const date = album.release_date;
  const copyRights = album.copyrights;

  return (
    <div className='px-5'>
      <AlbumProfileImg album={album} />
      <AlbumsTracks data={data} />
      <div className='text-white/50 text-xs my-8 pb-2'>
        <p className='text-xs'>{date}</p>
        {copyRights.map((obj: { text: string }, i: number) => <p key={i} className='my-1'>©{obj.text}</p>)}
      </div>
      <p className='border-b border-white/25 mt-8 mb-32'></p>
    </div>
  )
}



