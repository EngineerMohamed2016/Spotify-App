'use client'
import { AlbumTracksType } from "@/types/common";
import { StaticImageData } from "next/image";
import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";

type CntxType = {
    query: string;
    setQuery: Dispatch<SetStateAction<string>>;
    searchItem: string;
    setSearchItem: Dispatch<SetStateAction<string>>;
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
    trackUrl: string;
    setTrackUrl: Dispatch<SetStateAction<string>>;
    firePlay: boolean;
    setFirePlay: Dispatch<SetStateAction<boolean>>;
    trackDur: string | number;
    setTrackDur: Dispatch<SetStateAction<string | number>>;
    artN: string;
    setArtN: Dispatch<SetStateAction<string>>;
    traN: string;
    setTraN: Dispatch<SetStateAction<string>>;
    picU: string | StaticImageData;
    setPicU: Dispatch<SetStateAction<string | StaticImageData>>;
    artId: string;
    setArtId: Dispatch<SetStateAction<string>>;
    activeTrackId: string;
    setActiveTrackId: Dispatch<SetStateAction<string>>;
    globalSongsArr: AlbumTracksType;
    setGlobalSongsArr: Dispatch<SetStateAction<AlbumTracksType>>;
    trackIndex: number;
    setTrackIndex: Dispatch<SetStateAction<number>>;
}

const Cntx = createContext<CntxType>(null!);

export function CntxProvider({ children }: { children: React.ReactNode }) {
    const [query, setQuery] = useState('');
    const [searchItem, setSearchItem] = useState('');
    const [loading, setLoading] = useState(false);

    // player shared data
    const [trackUrl, setTrackUrl] = useState<string>('');
    const [firePlay, setFirePlay] = useState(false);
    const [trackDur, setTrackDur] = useState<string | number>('--:--');
    const [artN, setArtN] = useState('');
    const [traN, setTraN] = useState('');
    const [picU, setPicU] = useState<string | StaticImageData>('');
    const [artId, setArtId] = useState('');
    const [activeTrackId, setActiveTrackId] = useState('');

    // global songs array
    const [globalSongsArr, setGlobalSongsArr] = useState<AlbumTracksType>(null!);
    const [trackIndex, setTrackIndex] = useState(0);


    return <Cntx.Provider value={{
        query, setQuery, searchItem, setSearchItem, loading, setLoading,
        trackUrl, setTrackUrl, firePlay, setFirePlay, trackDur, setTrackDur,
        artN, setArtN, traN, setTraN, picU, setPicU, artId, setArtId, activeTrackId, setActiveTrackId,
        globalSongsArr, setGlobalSongsArr, trackIndex, setTrackIndex,
    }}>
        {children}
    </Cntx.Provider>
}

export function useCustomContext() {
    return useContext(Cntx);
}