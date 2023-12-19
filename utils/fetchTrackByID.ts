import { options } from "./options";

export async function fetchTrackByID(trackID: string) {
    const res = await fetch(`https://spotify81.p.rapidapi.com/tracks?ids=${trackID}`, options);
    return res.json();
}


