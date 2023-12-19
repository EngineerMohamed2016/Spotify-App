export type topFifty_obj = {
    trackMetadata: {
        trackName: string;
        artists: { name: string }[];
        trackUri: string;
        displayImageUri: string;
    }
}
export type topPropsT = {
    topFifty: topFifty_obj[] | any
}
