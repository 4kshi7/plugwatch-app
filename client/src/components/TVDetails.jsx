import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Axios from "../utils/Axios";
import Loading from "./Loading";
import noimage from "../../public/noimage.jpg";

function tvDetails() {
  const { id } = useParams();
  const [ultimateDetails, setUltimateDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchtvDetails = async () => {
      try {
        const [
          tvResponse,
          externalIdsResponse,
          recommendationsResponse,
          similarResponse,
          videosResponse,
          watchProvidersResponse,
          creditsResponse,
        ] = await Promise.all([
          Axios.get(`/tv/${id}`),
          Axios.get(`/tv/${id}/external_ids`),
          Axios.get(`/tv/${id}/recommendations`),
          Axios.get(`/tv/${id}/similar`),
          Axios.get(`/tv/${id}/videos`),
          Axios.get(`/tv/${id}/watch/providers`),
          Axios.get(`/tv/${id}/credits`),
        ]);

        const tvData = tvResponse.data;
        const externalIds = externalIdsResponse.data;
        const recommendations = recommendationsResponse.data.results;
        const similar = similarResponse.data.results;
        const videos = videosResponse.data.results.find(
          (m) => m.type === "Trailer"
        );
        const watchProviders = watchProvidersResponse.data.results.IN;
        const credits = creditsResponse.data;

        const allDetails = {
          tvData,
          externalIds,
          recommendations,
          similar,
          videos,
          watchProviders,
          credits,
        };

        setUltimateDetails(allDetails);
      } catch (error) {
        console.error("Error fetching tv details:", error);
        setError("Error fetching tv details. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchtvDetails();
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-white">{error}</div>;
  }

  return ultimateDetails ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.6),rgba(0,0,0,0.9)),
      url(https://image.tmdb.org/t/p/original/${ultimateDetails?.tvData?.backdrop_path})`,
        backgroundPosition: "top 7%",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="w-full h-fit px-[10%]"
    >
      {/* nav area */}
      <nav className="w-full text-zinc-100 flex gap-10 text-xl h-[10vh] items-center">
        <Link>
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-go-back-line cursor-pointer mr-1"
          ></i>
        </Link>
        <a target="_blank" href={ultimateDetails?.tvData?.homepage}>
          <i className="hover:text-[#6556CD] ri-links-fill"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.wikidata.org/wiki/${ultimateDetails?.externalIds?.wikidata_id}`}
        >
          <i className="hover:text-[#6556CD] ri-earth-line"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.imdb.com/title/${ultimateDetails?.externalIds?.imdb_id}`}
          className="hover:text-[#6556CD]"
        >
          imdb
        </a>
      </nav>

      {/* poster and details */}

      <div className="w-full flex ">
        <img
          className="shadow-[8px_17px_38px_2px_rgba(0,0,0,2)] w-[40vh] object-cover"
          src={`https://image.tmdb.org/t/p/original/${
            ultimateDetails?.tvData?.poster_path ||
            ultimateDetails?.tvData?.backdrop_path
          })`}
          alt=""
        />

        <div className="content ml-[5%]">
          <h1 className="text-5xl font-semibold">
            {ultimateDetails?.tvData?.name ||
              ultimateDetails?.tvData?.title ||
              ultimateDetails?.tvData?.original_name ||
              ultimateDetails?.tvData?.original_title}
            <small className="text-2xl font-bold text-zinc-300">
              {ultimateDetails?.tvData?.first_air_date
                ? `(${ultimateDetails?.tvData?.first_air_date.split("-")[0]})`
                : ""}
            </small>
          </h1>
          <div className="mt-3  flex text-zinc-100 items-center gap-x-5">
            <span className="text-white w-[5vh] h-[5vh] flex text-xl font-semibold justify-center items-center bg-yellow-600 rounded-full">
              {(ultimateDetails?.tvData?.vote_average * 10).toFixed()}{" "}
              <sup>%</sup>
            </span>
            <h1 className="font-semibold text-2xl leading-6">User Score</h1>
          </div>
          <h1>Episodes: {ultimateDetails?.tvData?.number_of_episodes}</h1>
          <h1>Released : {ultimateDetails?.tvData?.first_air_date}</h1>
          <h1 className="text-xl my-2 font-semibold italic">
            {ultimateDetails?.tvData?.tagline}
          </h1>
          <div className="flex items-center text-white">
            <p className="mb-2.5 mr-2">Genres:</p>
            {ultimateDetails?.tvData?.genres.map((genre) => (
              <span
                key={genre?.id}
                className="bg-[#000000aa]  px-2 py- rounded-lg mr-2 mb-2"
              >
                {genre?.name}
              </span>
            ))}
          </div>
          <h1 className="text-2xl mt-1">Overview</h1>
          <p className="mb-10">{ultimateDetails?.tvData?.overview}</p>
          <Link
            className="min-w-[20.5vh] rounded-xl bg-[#000000aa] px-5 py-5"
            to={`https://www.youtube.com/watch?v=${ultimateDetails?.videos?.key}`}
            target="_blank"
          >
            <i className="ri-play-fill text-xl"></i>
            Watch Trailer
          </Link>
          {/* platforms available */}
          <div className="w-[80%] flex flex-col gap-y-5 mt-10">
            {ultimateDetails?.watchProviders &&
              ultimateDetails?.watchProviders?.flatrate && (
                <div className="flex gap-x-10 items-center text-white">
                  <h1>Available on </h1>
                  {ultimateDetails?.watchProviders?.flatrate.map((w, i) => (
                    <img
                      key={i}
                      title={w?.provider_name}
                      className="h-[5vh] w-[5vh] object-cover rounded-md"
                      src={`https://image.tmdb.org/t/p/original/${w?.logo_path})`}
                      alt=""
                    />
                  ))}
                </div>
              )}

            {ultimateDetails?.watchProviders &&
              ultimateDetails?.watchProviders?.rent && (
                <div className="flex gap-x-10 items-center text-white">
                  <h1>Rent</h1>
                  {ultimateDetails?.watchProviders?.rent.map((w) => (
                    <img
                      title={w?.provider_name}
                      className="h-[5vh] w-[5vh] object-cover rounded-md"
                      src={`https://image.tmdb.org/t/p/original/${w?.logo_path})`}
                      alt=""
                    />
                  ))}
                </div>
              )}

            {ultimateDetails?.watchProviders &&
              ultimateDetails?.watchProviders?.buy && (
                <div className="flex gap-x-10 items-center text-white">
                  <h1>Buy</h1>
                  {ultimateDetails?.watchProviders?.buy.map((w) => (
                    <img
                      title={w?.provider_name}
                      className="h-[5vh] w-[5vh] object-cover rounded-md"
                      src={`https://image.tmdb.org/t/p/original/${w?.logo_path})`}
                      alt=""
                    />
                  ))}
                </div>
              )}
          </div>
        </div>
      </div>

      <div className="w-[80%] flex flex-col gap-y-5 mt-10">
        {/* seasons */}
        <hr className="mt-5 mb-5 border-none h-[2px] bg-zinc-500" />
        <h1 className="text-3xl font-bold text-white">Seasons</h1>
        <div className="w-[85vw] flex overflow-y-hidden mb-5 p-5">
          {ultimateDetails?.tvData?.seasons.map((s, i) => (
            <div key={i} className="w-[30vh] mr-[5%]">
              <img
                className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] min-w-[15vw] h-[50vh] object-cover"
                src={s?.poster_path ? `https://image.tmdb.org/t/p/original/${s?.poster_path}` : noimage}
                alt=""
              />
              <div className="flex items-center">
                <h1 className="text-2xl text-zinc-100 mt-3 font-semibold">
                  {s?.name || s?.title || s?.original_name || s?.original_title}
                  <span>&nbsp;&nbsp;</span>
                </h1>
              </div>
            </div>
          ))}
        </div>

        {/* cast */}
        <hr className="mt-1 mb-1 border-none h-[2px] bg-zinc-500" />
        <h1 className="text-3xl font-bold text-white">Cast</h1>

        <div className="w-[85vw] flex overflow-y-hidden mb-5 p-5">
          {ultimateDetails?.credits?.cast?.map((s, i) => (
            <Link
            key={i}
              to={`/person/details/${ultimateDetails?.credits?.cast[i]?.id}`}
              className="w-[30vh] mr-[5%]"
            >
              <div key={i} className="">
                <img
                  className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] min-w-[15vw] h-[50vh] object-cover"
                  src={s?.profile_path ? `https://image.tmdb.org/t/p/original/${s?.profile_path}` : noimage}
                  alt=""
                />
                <div className="flex flex-col">
                  <h1 className="text-2xl text-zinc-100 mt-3 font-semibold">
                    {s?.original_name}
                    <span>&nbsp;&nbsp;</span>
                  </h1>
                  <h1 className="italic font-semibold text-zinc-500">
                    {s?.character}
                  </h1>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default tvDetails;
