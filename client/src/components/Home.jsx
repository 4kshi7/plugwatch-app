import { useEffect, useState } from "react";
import Navbar from "./partials/Navbar";
import Topnav from "./partials/Topnav";
import Header from "./partials/Header";
import Axios from "../utils/Axios";
import HorizontalCards from "./partials/HorizontalCards";
import Loading from "./Loading";

function Home() {
  document.title = "PlugWatch";

  const [wallpaper, setWallpaper] = useState(null);
  const [trending, settrending] = useState(null);
  const [popular, setpopular] = useState(null);

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

  const gettrending = async () => {
    try {
      const { data } = await Axios.get(`/trending/all/day`);
      settrending(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const getpopular = async () => {
    try {
      const { data } = await Axios.get("/tv/top_rated");
      setpopular(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    !wallpaper && getHeaderWallpaper();
    !trending && gettrending();
    !popular && getpopular();
  }, []);

  return wallpaper && trending && popular ? (
    <>
      <Navbar />
      <div className="w-[80%] h-full overflow-auto overflow-x-hidden">
        <Topnav />
        <Header data={wallpaper} />
        <HorizontalCards data={trending} title={"Movies"} />
      </div>
    </>
  ) : (
    <Loading />
  );
}

export default Home;
