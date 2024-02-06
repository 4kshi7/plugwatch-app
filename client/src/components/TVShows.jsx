import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./partials/Topnav";
import Axios from "../utils/Axios";
import Cards from "./partials/Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const TVShows = () => {
  document.title = "TV Series"
  const navigate = useNavigate();
  const [category, setCategory] = useState("top_rated");
  const [tvshow, settvshow] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

  const gettvshow = async () => {
    try {
      const { data } = await Axios.get(`/tv/${category}?page=${page}`);

      if (data.results.length > 0) {
        settvshow((prevState) => [...prevState, ...data.results]);
        setpage(page + 1);
      } else {
        sethasMore(false);
      }
      //   settvshow(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const refreshHandler = () => {
    if (tvshow.length === 0) {
      gettvshow();
    } else {
      setpage(1);
      settvshow([]);
      gettvshow();
    }
  };

  useEffect(() => {
    refreshHandler();
    gettvshow();
  }, [category]);

  return tvshow.length > 0 ? (
    <div className="flex flex-col">
      <div className="w-full h-screen flex items-start px-[10%]">
        <div className="w-full flex items-center ">
          <h1 className="text-2xl text-zinc-400 font-semibold mr-[15%]">
            <i
              onClick={() => navigate(-1)}
              className="hover:text-[#2EA423] ri-arrow-go-back-line cursor-pointer mr-1"
            ></i>
            Series
          </h1>
          <Topnav />
        </div>
      </div>
      <div className="">
        <InfiniteScroll
          dataLength={tvshow.length}
          next={gettvshow}
          hasMore={hasMore}
          loader={<>loading</>}
        >
          <Cards data={tvshow} title="tv" />
        </InfiniteScroll>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default TVShows;
