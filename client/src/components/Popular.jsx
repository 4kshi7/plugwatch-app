// Popular.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./partials/Topnav";
import Axios from "../utils/Axios";
import Cards from "./partials/Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import { useRecoilState } from "recoil";
import {
  popularState,
  pageState,
  hasMoreState,
  categoryState,
} from "../utils/Atoms";

const Popular = () => {
  document.title = "Popular";
  const navigate = useNavigate();
  const [popular, setPopular] = useRecoilState(popularState);
  const [page, setPage] = useRecoilState(pageState);
  const [hasMore, setHasMore] = useRecoilState(hasMoreState);
  const [category, setCategory] = useRecoilState(categoryState);

  const getPopular = async () => {
    try {
      const { data } = await Axios.get(`${category}/popular?page=${page}`);

      if (data.results.length > 0) {
        setPopular((prevState) => [...prevState, ...data.results]);
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
    setPopular([]);
    setHasMore(true);
    getPopular();
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return popular.length > 0 ? (
    <div className="flex flex-col">
      <div className="w-full h-screen flex items-start px-[10%]">
        <div className="w-full flex items-center">
          <h1 className="text-2xl text-zinc-400 font-semibold mr-[15%]">
            <i
              onClick={() => navigate(-1)}
              className="hover:text-[#2EA423] ri-arrow-go-back-line cursor-pointer mr-1"
            ></i>
            Popular
          </h1>
          <Topnav />
        </div>
      </div>
      <div className="">
        <InfiniteScroll
          dataLength={popular.length}
          next={getPopular}
          hasMore={hasMore}
          loader={<>loading</>}
        >
          <Cards data={popular} title={category} />
        </InfiniteScroll>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Popular;
