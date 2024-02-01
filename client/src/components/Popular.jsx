import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./partials/Topnav";
import Axios from "../utils/Axios";
import Cards from "./partials/Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const Popular = () => {
  document.title = "Popular";
  const navigate = useNavigate();
  const [category, setCategory] = useState("movie");
  const [popular, setpopular] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

  const getpopular = async () => {
    try {
      const { data } = await Axios.get(`${category}/popular?page=${page}`);

      if (data.results.length > 0) {
        setpopular((prevState) => [...prevState, ...data.results]);
        setpage(page + 1);
      } else {
        sethasMore(false);
      }
      //   setpopular(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const refreshHandler = () => {
    if (popular.length === 0) {
      getpopular();
    } else {
      setpage(1);
      setpopular([]);
      getpopular();
    }
  };

  useEffect(() => {
    refreshHandler();
    getpopular();
  }, [category]);

  return popular.length > 0 ? (
    <div className=" flex flex-col">
      <div className=" w-full h-screen flex items-start px-[10%]">
        <div className="w-full flex items-center ">
          <h1 className="text-2xl text-zinc-400 font-semibold">
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
          next={getpopular}
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
