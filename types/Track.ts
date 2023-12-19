export type playPropsT = {
    trackId: string;
    trackObj: {
        tracks: {
            name: string;
            album: {
                images: { url: string }[];
            }
            preview_url: string;
            artists: { name: string; id: string }[];
        }[]
    }
}

export type lyricsT = {
    lyricsObj: {
        error?: string;
        lyrics: {
            lines: { words: string }[]
        }
    }
}

export type trackProfT = {
    trackObj: {
        tracks: {
            name: string;
            album: {
                images: {
                    url: string;
                }[]
                release_date: string;
            }
            duration_ms: number;
            artists: {
                name: string;
                id: string;
            }[]
        }[]
    }
}