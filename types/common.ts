import { StaticImageData } from "next/image";

// Artist + Album + Track pages
export type PagePropsT = {
    params: {
        id: string;
    }
}

// Album page + AlbumTracks.tsx + Songs.tsx in Search Page SongsWithScroll.tsx in Search Page + PopularTracks.tsx in Artist page
export type AlbumTracksObjType = {
    trackId: string;
    trackName: string;
    artN: string
    artId: string;
    dur: string;
    prevLink?: string;
    img: StaticImageData | string;
    playCount?: string;
    albumName?:string;
    albumId?:string;
}
export type AlbumTracksType = AlbumTracksObjType[];
