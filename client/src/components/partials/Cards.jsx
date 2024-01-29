import React from "react";
import { Link } from "react-router-dom";
import noimage from "../../../public/noimage.jpg";

const Cards = ({ data, title }) => {
  return (
    <div className="flex flex-wrap pt-5 w-full mx-[5%] justify-center items-center bg-[#0f0f0f]">
      {data.map((c, i) => (
        <Link
          to={`/${c.media_type || title}/details/${c.id}`}
          className="relative w-[25vh] mr-[5%] mb-[5%] hover:scale-[110%] duration-200"
          key={i}
        >
          <img
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0,2)] w-[40vh] object-cover"
            src={
              c.poster_path || c.backdrop_path || c.profile_path
                ? `https://image.tmdb.org/t/p/original/${
                    c.poster_path || c.backdrop_path || c.profile_path
                  })`
                : noimage
            }
            alt=""
          />
          <h1 className=" text-lg text-zinc-300 mt-3 font-semibold">
            {(c.name || c.title || c.original_name || c.original_title).slice(
              0,
              20
            )}
          </h1>

          {c.vote_average && (
            <div className="text-white w-[5vh] h-[5vh] flex font-xl font-semibold justify-center items-center bg-yellow-600 rounded-full absolute right-[-10%] bottom-[25%]">
              {(c.vote_average * 10).toFixed()} <sup>%</sup>
            </div>
          )}
        </Link>
      ))}
    </div>
  );
};

export default Cards;
