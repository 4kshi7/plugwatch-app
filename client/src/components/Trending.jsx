import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./partials/Topnav";
import Axios from "../utils/Axios";
import Cards from "./partials/Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import { useRecoilState } from "recoil";
import {
  trendingState,
  pageState,
  hasMoreState,
  categoryState,
  durationState,
} from "../utils/Atoms";

const Trending = () => {
  document.title = "Trending";
  const navigate = useNavigate();
  const [trending, setTrending] = useRecoilState(trendingState);
  const [page, setPage] = useRecoilState(pageState);
  const [hasMore, setHasMore] = useRecoilState(hasMoreState);
  const [category, setCategory] = useRecoilState(categoryState);
  const [duration, setDuration] = useRecoilState(durationState);

  useEffect(() => {
    // Initialize trending state with an empty array
    setTrending([]);
  }, []);

  const getTrending = async () => {
    try {
      const { data } = await Axios.get(
        `/trending/${category}/${duration}?page=${page}`
      );

      if (data.results.length > 0) {
        setTrending((prevState) => [...prevState, ...data.results]);
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
    setTrending([]);
    setHasMore(true);
    getTrending();
  };

  useEffect(() => {
    refreshHandler();
  }, []);

  return trending.length > 0 ? (
    <div className="flex flex-col">
      <div className="w-full h-screen flex items-start px-[10%]">
        <div className=" w-full flex items-center ">
          <h1 className="text-2xl text-zinc-400 font-semibold mr-[15%]">
            <i
              onClick={() => navigate(-1)}
              className="hover:text-[#2EA423] ri-arrow-go-back-line cursor-pointer mr-1"
            ></i>
            Trending
          </h1>
          <Topnav />
        </div>
      </div>
      <div className="">
        <InfiniteScroll
          dataLength={trending.length}
          next={getTrending}
          hasMore={hasMore}
          loader={<>loading</>}
        >
          <Cards data={trending} title={category} />
        </InfiniteScroll>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Trending;
