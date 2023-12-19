
export type SearchPropsT = {
    params: {
        query: string[];
    }
}

export type search_AlbumsT = {
    albumsArr: {
        data: {
            coverArt: {
                sources: { url: string }[];
            }
            name: string;
            date: {
                year: string;
            }
            artists: {
                items: {
                    profile: {
                        name: string;
                    }
                }[]
            }
            uri: string;
        }
    }[]
}

export type ArtistsPropsT = {
    artistsArr: {
        data: {
            profile: {
                name: string;
            }
            uri: string;
            visuals: {
                avatarImage: {
                    sources: {
                        url: string;
                    }[]
                }
            }
        }
    }[]
}

export type TopResType = {
    artistsArr: {
        data: {
            profile: {
                name: string;
            }
            uri: string;
            visuals: {
                avatarImage: {
                    sources: { url: string }[]
                }
            }
        }

    }[]
}

export type red_obj_Search = {
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