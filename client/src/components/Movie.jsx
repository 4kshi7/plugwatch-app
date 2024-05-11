// Movie.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import Topnav from "./partials/Topnav";
import Axios from "../utils/Axios";
import Cards from "./partials/Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import { movieState, pageState, hasMoreState } from "../utils/Atoms";

const Movie = () => {
  document.title = "Bollywood";
  const navigate = useNavigate();
  const [movie, setMovie] = useRecoilState(movieState);
  const [page, setPage] = useRecoilState(pageState);
  const [hasMore, setHasMore] = useRecoilState(hasMoreState);

  const getMovie = async () => {
    try {
      const { data } = await Axios.get(
        `/discover/movie?with_origin_country=IN&page=${page}`
      );

      if (data.results.length > 0) {
        setMovie((prevState) => [...prevState, ...data.results]);
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
    setMovie([]);
    setHasMore(true);
    getMovie();
  };

  useEffect(() => {
    refreshHandler();
  }, []);

  return movie.length > 0 ? (
    <div className="flex flex-col">
      <div className="w-full h-screen flex items-start px-[10%]">
        <div className="w-full flex items-center ">
          <h1 className="text-2xl text-zinc-400 font-semibold mr-[15%]">
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
          next={getMovie}
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
