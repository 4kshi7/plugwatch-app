import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "../../utils/Axios";

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
        background: `linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0.3),rgba(0,0,0,0.5)),
        url(https://image.tmdb.org/t/p/original/${
          data.backdrop_path || data.profile_path
        })`,
        backgroundPosition: "center 7%",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        borderRadius: "20px",
      }}
      className="ml-9 w-[96%] h-[50vh] flex flex-col justify-end items-start p-[5%]"
    >
      <h1 className="w-[70%] text-5xl  text-white">
        {(data.name || data.title || data.original_name || data.original_title).slice(0, 25)}
      </h1>
      <p className="w-[70%] mt-3 mb-3 text-white">
        {data.overview.slice(0, 150)}...
        <Link to={`/${data.media_type}/details/${data.id}`} className="text-blue-400"> more</Link>
      </p>
      <p className="text-white">
        <i className="text-yellow-500 ri-megaphone-fill mr-1"></i>
        {data.release_date || "No info"}
        <i className="ml-5 text-yellow-500 ri-vidicon-2-fill mr-1"></i>
        {data.media_type.toUpperCase()}
      </p>
      <Link
        to={`https://www.youtube.com/watch?v=${ultimateDetails?.videos?.key}`} 
        target="_blank"
        className="p-4 bg-[#2EA423] text-white rounded  mt-5"
      >
        Watch Trailer
      </Link>
    </div>
  );
};

export default Header;
