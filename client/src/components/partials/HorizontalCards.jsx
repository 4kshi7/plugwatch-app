import React from "react";
import { Link } from "react-router-dom";

const HorizontalCards = ({ data , title}) => {
  // console.log(data)
  return (
    <div className="w-full px-[2%] py-4">
      <div className="mb-1">
        <h1 className="text-xl ml-2 text-zinc-400 font-semibold ">{title.toUpperCase()} </h1>
      
      </div>
      <div className="w-[100%] flex overflow-y-hidden p-4">
        {data.map((d, i) => (
          <Link to={`/${d.media_type|| title}/details/${d.id}`} key={i} className=" hover:scale-[105%] duration-200 lg:min-w-[34vh] md:min-w-[30vh] min-w-[38vh] h-full mr-8 bg-zinc-900 hover:bg-zinc-700">
            <img
              className="h-[50vh] lg:h-[47vh] md:h-[45vh] w-full object-cover overflow-"
              src={`https://image.tmdb.org/t/p/original/${
                d.poster_path
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
           
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HorizontalCards;
