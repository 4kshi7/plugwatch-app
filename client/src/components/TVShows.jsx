import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./partials/Topnav";
import Axios from "../utils/Axios";
import Cards from "./partials/Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import { useRecoilState } from "recoil";
import {
  tvShowState,
  tvShowPageState,
  tvShowHasMoreState,
  tvShowCategoryState,
} from "../utils/Atoms";

const TVShows = () => {
  document.title = "TV Series";
  const navigate = useNavigate();
  const [tvShow, setTvShow] = useRecoilState(tvShowState);
  const [page, setPage] = useRecoilState(tvShowPageState);
  const [hasMore, setHasMore] = useRecoilState(tvShowHasMoreState);
  const [category, setCategory] = useRecoilState(tvShowCategoryState);

  const getTvShow = async () => {
    try {
      const { data } = await Axios.get(`/tv/${category}?page=${page}`);

      if (data.results.length > 0) {
        setTvShow((prevState) => [...prevState, ...data.results]);
        setPage(page + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const refreshHandler = () => {
    setPage(1);
    setTvShow([]);
    setHasMore(true);
    getTvShow();
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return tvShow.length > 0 ? (
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
          dataLength={tvShow.length}
          next={getTvShow}
          hasMore={hasMore}
          loader={<>loading</>}
        >
          <Cards data={tvShow} title="tv" />
        </InfiniteScroll>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default TVShows;
