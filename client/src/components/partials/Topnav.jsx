import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../utils/Axios";
import { useEffect } from "react";
import noimage from "/noimage.jpg";

const Topnav = () => {
  const [query, setQuery] = useState("");
  const [searches, setSearches] = useState([]);
  const GetSearches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setSearches(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetSearches();
  }, [query]);

  return (
    <div className="w-fit  h-[10vh] relative flex justify-start items-center">
      <div className="w-[30vw] flex justify-between rounded-3xl items-center border-[#ffffff3c] py-1 border-[1px]">
        <i className="text-zinc-400 text-lg ri-search-line ml-3"></i>
        <input
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          className="w-full ml-4 text-lg outline-none border-none bg-transparent text-white"
          type="text"
          placeholder="Search here..."
        />
        {query.length > 0 && (
          <i
            onClick={() => setQuery("")}
            className="text-zinc-400  text-2xl ri-close-fill hover:cursor-pointer mr-3 "
          ></i>
        )}
      </div>

      <div className=" lg:w-[100%] max-h-[60vh] absolute top-[100%] bg-zinc-800 overflow-auto z-10">
        {searches.map((s, i) => (
          <Link
            to={`/${s.media_type}/details/${s.id}`}
            key={i}
            className="hover:text-white hover:bg-zinc-900 font-semibold text-zinc-100 w-[100%] p-3 flex justify-start items-center border-b-2 border-zinc-800 duration-300 "
          >
            <img
              className="w-[15vh] h-[15vh] object-cover rounded mr-5 shadow-lg hover:rotate-6 duration-300"
              src={
                s.backdrop_path || s.profile_path
                  ? `https://image.tmdb.org/t/p/original/${
                      s.backdrop_path || s.profile_path
                    }`
                  : noimage
              }
              alt=""
            />
            <span>
              {s.name || s.title || s.original_name || s.original_title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Topnav;
