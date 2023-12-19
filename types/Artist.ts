export type AboutPropsT = {
    artObj: {
        stats: {
            monthlyListeners: string;
        };
        profile: {
            biography: {
                text: string;
            };
        };
        visuals: {
            gallery: {
                items: {
                    sources: {
                        url: string
                    }[];
                }[];
            };
            avatarImage: {
                sources: {
                    url: string;
                }[];
            }
        };
    }
}


// reducing function input array in Artist Page
type red_obj_Art = {
    track: {
        id: string;
        name: string;
        artists: {
            items: {
                profile: {
                    name: string;
                };
                uri: string;
            }[];
        }
        duration: {
            totalMilliseconds: string;
        };
        album: {
            coverArt: {
                sources: { url: string }[]
            }
        }
        playcount: string;
    }

    artists: {
        name: string;
        id: string;
    }[];

    duration_ms: string;
    preview_url: string;
}
export type red_Arr_Art = red_obj_Art[];


type disco_Arr_obj = {
    releases: {
        items: {
            id: string;
            name: string;
            coverArt: {
                sources: {
                    url: string
                }[];
            };
        }[];
    };
}
export type disco_PropsT = {
    artObj: {
        discography: {
            popularReleases: {
                items: disco_Arr_obj[];
            };
            albums: {
                items: disco_Arr_obj[];
            };

            singles: {
                items: disco_Arr_obj[];
            };

        };
    }
}


export type fans_Arr_obj = {
    id: string;
    profile: {
        name: string;
    }
    visuals: {
        avatarImage: {
            sources: { url: string }[];
        }
    }
}
export type fansPropsT = {
    artObj: {
        relatedContent: {
            relatedArtists: {
                items: fans_Arr_obj[]
            }
        }
    }
}


export type profileImgPropsT = {
    artObj: {
        visuals: {
            headerImage: {
                sources: { url: string }[];
                extractedColors: {
                    colorRaw: {
                        hex:string;
                    }
                }
            };
            avatarImage: {
                sources: { url: string }[];
                extractedColors: {
                    colorRaw: {
                        hex:string;
                    }
                }
            };
        }
        stats: {
            monthlyListeners:string;
        };

        profile: {
            verified:string;
            name:string;
        }
    }
}

