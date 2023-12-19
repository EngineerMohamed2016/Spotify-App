import { StaticImageData } from "next/image";

export type playerObjType = {
    artN: string;
    trackName: string;
    trackId: string;
    prevLink?: string | undefined;
    artId: string;
    imgUrl: string | StaticImageData;
    index: number;
}

export type AlbumProfileT = {
    album: {
        images: {
            url: string;
        }[];
        name: string;
        artists: {
            id: string;
            name: string;
        }[];
        release_date: string;
        total_tracks: string;
    }
}

// reducing function input array in Album Page
type alb_obj_Art = {
    id: string;
    name: string;
    artists: {
        name: string;
        id: string;
    }[];

    duration_ms: string;
    preview_url: string;
}
export type alb_Arr_Art = alb_obj_Art[];


