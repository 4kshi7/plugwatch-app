import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./partials/Topnav";
import Axios from "../utils/Axios";
import Cards from "./partials/Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const Movie = () => {
  document.title = "Bollywood"
  const navigate = useNavigate();
  const [category, setCategory] = useState("now_playing");
  const [movie, setmovie] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

  const getmovie = async () => {
    try {
      const { data } = await Axios.get(`/discover/movie?with_origin_country=IN&page=${page}`);
  
      if (data.results.length > 0) {
        setmovie((prevState) => [...prevState, ...data.results]);
        setpage(page + 1);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const refreshHandler = () => {
    if (movie.length === 0) {
      getmovie();
    } else {
      setpage(1);
      setmovie([]);
      getmovie();
    }
  };

  useEffect(() => {
    refreshHandler();
    getmovie();
  }, [category]);

  return movie.length > 0 ? (
    <div className="flex flex-col">
      <div className="px-[5%] w-screen h-screen flex items-start">
        <div className="w-full flex items-center ">
          <h1 className="text-2xl text-zinc-400 font-semibold">
            <i
              onClick={() => navigate(-1)}
              className="hover:text-[#2EA423] ri-arrow-go-back-line cursor-pointer mr-1"
            ></i>
            Bollywood
          </h1>
          <Topnav />
        </div>
      </div>
      <div className="">
        <InfiniteScroll
          dataLength={movie.length}
          next={getmovie}
          hasMore={hasMore}
          loader={<>loading</>}
        >
          <Cards data={movie} title="movie" />
        </InfiniteScroll>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Movie;
