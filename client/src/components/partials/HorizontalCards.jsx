import React from "react";
import { Link } from "react-router-dom";

const HorizontalCards = ({ data , title}) => {
  // console.log(data)
  return (
    <div className="w-full p-5">
      <div className="mb-1">
        <h1 className="text-xl ml-2 text-zinc-400 font-semibold ">{title.toUpperCase()} </h1>
      
      </div>
      <div className="w-[100%] flex overflow-y-hidden p-4">
        {data.map((d, i) => (
          <Link to={`/${d.media_type|| title}/details/${d.id}`} key={i} className=" hover:scale-[110%] duration-200 min-w-[20%] h-full mr-8 bg-zinc-900 ">
            <img
              className="w-full h-[55%] object-cover"
              src={`https://image.tmdb.org/t/p/original/${
                d.backdrop_path || d.poster_path
              }`}
              alt=""
            />
            <div className="text-white p-3 h-[45%]">
              <h1 className="text-xl font-semibold">
                {(
                  d.name ||
                  d.title ||
                  d.original_name ||
                  d.original_title
                ).slice(0, 15)}...
              </h1>
              <p className="text-zinc-500">
                {d.overview.slice(0,70)}...
                <span className="text-zinc-100"> more</span>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HorizontalCards;
