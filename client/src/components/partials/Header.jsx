import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "../../utils/Axios";
import Navbar from "./Navbar";

const Header = ({ data }) => {
  const [ultimateDetails, setUltimateDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const videosResponse = await Axios.get(`/movie/${data.id}/videos`);
        const videos = videosResponse.data.results.find(
          (m) => m.type === "Trailer"
        );

        const allDetails = {
          videos,
        };
        setUltimateDetails(allDetails);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setError("Error fetching movie details. Please try again later.");
        setIsLoading(false);
      }
    };

    if (data && data.id) {
      fetchMovieDetails();
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.3),rgba(0,0,0,0.2)),
        url(https://image.tmdb.org/t/p/original/${
          data.backdrop_path || data.profile_path
        })`,
        backgroundPosition: "center 7%",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        borderRadius: "0 0 5% 5%",
      }}
      className="w-[100%] h-[75vh] flex flex-col items-start px-[5%]"
    >
      <Navbar />
      <div className="h-ful w-full flex flex-col gap-3">
        <h1 className="lg:w-[70%] mt-4 text-5xl  text-white">
          {(
            data.name ||
            data.title ||
            data.original_name ||
            data.original_title
          ).slice(0, 25)}
        </h1>
        <p className=" lg:w-[40%] mt-3 mb-3 italic text-md text-white">
          {data.overview.slice(0, 300)}...
        </p>
        <div className="flex gap-5 ">
          <p className="text-white">
            <i className="text-yellow-500 ri-megaphone-fill mr-1"></i>
            {data.release_date || "No info"}
            <i className="ml-5 text-yellow-500 ri-vidicon-2-fill mr-1"></i>
            {data.media_type.toUpperCase()}
          </p>
        </div>
        <div className=" flex lg:gap-6 gap-7">
          <Link
            to={`/${data.media_type}/details/${data.id}`}
            target="_blank"
            className="md:w-[9vw] h-fit px-4 lg:w-[9vw] py-3  flex justify-center bg-[#2EA423] hover:scale-110 duration-200 text-white rounded  mt-5"
          >
            Read More
          </Link>
          <Link
            to={`https://www.youtube.com/watch?v=${ultimateDetails?.videos?.key}`}
            target="_blank"
            className="md:w-[9vw] h-fit px-4 lg:w-[9vw] py-3  flex justify-center border-[1px] border-white  hover:scale-110 duration-200 text-white mt-5"
          >
            Watch Trailer
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
