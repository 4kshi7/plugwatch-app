// Home.jsx
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { wallpaperState, trendingState, popularState } from "../utils/Atoms";
import Axios from "../utils/Axios";
import Header from "./partials/Header";
import HorizontalCards from "./partials/HorizontalCards";
import Loading from "./Loading";

function Home() {
  document.title = "PlugWatch";

  const [wallpaper, setWallpaper] = useRecoilState(wallpaperState);
  const [trending, setTrending] = useRecoilState(trendingState);
  const [popular, setPopular] = useRecoilState(popularState);

  const getHeaderWallpaper = async () => {
    try {
      const { data } = await Axios.get(`/trending/all/day`);
      let randomdata =
        data.results[(Math.random() * data.results.length).toFixed()];
      setWallpaper(randomdata);
    } catch (error) {
      console.log(error);
    }
  };

  const getTrending = async () => {
    try {
      const { data } = await Axios.get(`/trending/all/day`);
      setTrending(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const getPopular = async () => {
    try {
      const { data } = await Axios.get("/tv/top_rated");
      setPopular(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!wallpaper) getHeaderWallpaper();
    if (!trending.length) getTrending();
    if (!popular.length) getPopular();
  }, []);

  return wallpaper && trending && popular ? (
    <>
      <div className="w-[100%] h-full overflow-auto overflow-x-hidden">
        <Header data={wallpaper} />
        <HorizontalCards data={trending} title={"Trending"} />
        <HorizontalCards data={popular} title={"TV"} />
      </div>
    </>
  ) : (
    <Loading />
  );
}

export default Home;
