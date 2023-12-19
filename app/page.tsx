export const revalidate = 0
import Recommend from "@/components/home/Recommend"
import TopFiftySongs from "@/components/home/TopFiftySongs"
import { options } from "@/utils/options";
import axios from 'axios'

// fetch recommended songs
const getRecommended = async () => {
  const { data: songs } = await axios.get(`https://spotify-app-woad.vercel.app/api/recommended`);
  return songs;
}

const getTopFiftySongs = async () => {
  const url = 'https://spotify81.p.rapidapi.com/top_200_tracks?country=EG';
  const res = await fetch(url, options);
  return res.json();
};


export default async function Home() {
  const [topFifty, recommended] = await Promise.all([getTopFiftySongs(), getRecommended()]);

  return (
    <>
      <Recommend recommended={recommended} />
      <TopFiftySongs topFifty={topFifty} />
    </>
  )
}
