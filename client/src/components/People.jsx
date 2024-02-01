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
  const [person, setPerson] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false); // Add loading state

  const getPerson = async () => {
    try {
      setLoading(true); // Set loading state to true
      const { data } = await Axios.get(`/person/${category}?page=${page}`);

      if (data.results.length > 0) {
        setPerson((prevState) => [...prevState, ...data.results]);
        setPage(page + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Set loading state to false after request completes
    }
  };

  const refreshHandler = () => {
    setPage(1);
    setPerson([]); // Clear existing data
    setHasMore(true); // Reset hasMore flag
    getPerson();
  };

  useEffect(() => {
    refreshHandler();
    return () => {
      // Cleanup function to cancel any pending requests or subscriptions
    };
  }, [category]);

  return (
    <div className="flex flex-col">
      <div className="w-full h-screen flex items-start px-[10%]">
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
        {loading ? ( // Show loading indicator while data is being fetched
          <Loading />
        ) : (
          <InfiniteScroll
            dataLength={person.length}
            next={getPerson}
            hasMore={hasMore}
            loader={<>loading</>}
          >
            <Cards data={person} title="person" />
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
};

export default People;
