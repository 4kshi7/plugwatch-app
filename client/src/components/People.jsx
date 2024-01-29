import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./partials/Topnav";
import Axios from "../utils/Axios";
import Cards from "./partials/Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const People = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("popular");
  const [person, setperson] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

  const getperson = async () => {
    try {
      const { data } = await Axios.get(`/person/${category}?page=${page}`);

      if (data.results.length > 0) {
        setperson((prevState) => [...prevState, ...data.results]);
        setpage(page + 1);
      } else {
        sethasMore(false);
      }
      //   setperson(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const refreshHandler = () => {
    if (person.length === 0) {
      getperson();
    } else {
      setpage(1);
      setperson([]);
      getperson();
    }
  };

  useEffect(() => {
    refreshHandler();
    getperson();
  }, [category]);
  return person.length > 0 ? (
    <div className="flex flex-col">
      <div className="px-[5%] w-screen h-screen flex items-start">
        <div className="w-full flex items-center ">
          <h1 className="text-2xl text-zinc-400 font-semibold">
            <i
              onClick={() => navigate(-1)}
              className="hover:text-[#2EA423] ri-arrow-go-back-line cursor-pointer mr-1"
            ></i>
            Actors
          </h1>
          <Topnav />
        </div>
      </div>
      <div className="">
        <InfiniteScroll
          dataLength={person.length}
          next={getperson}
          hasMore={hasMore}
          loader={<>loading</>}
        >
          <Cards data={person} title="person" />
        </InfiniteScroll>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default People;
