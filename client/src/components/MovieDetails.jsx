// MovieDetails.jsx
import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import Axios from "../utils/Axios";
import Loading from "./Loading";
import noimage from "../../public/noimage.jpg";
import {
  ultimateDetailsState,
  isLoadingState,
  errorState,
} from "../utils/Atoms";

function MovieDetails() {
  const { id } = useParams();
  const [ultimateDetails, setUltimateDetails] = useRecoilState(
    ultimateDetailsState
  );
  const [isLoading, setIsLoading] = useRecoilState(isLoadingState);
  const [error, setError] = useRecoilState(errorState);
  const navigate = useNavigate();

  const title = `${
    ultimateDetails?.movieData?.name ||
    ultimateDetails?.movieData?.title ||
    ultimateDetails?.movieData?.original_name ||
    ultimateDetails?.movieData?.original_title
  }`;

  document.title = "Movie Details";

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const [
          movieResponse,
          externalIdsResponse,
          recommendationsResponse,
          similarResponse,
          videosResponse,
          watchProvidersResponse,
          creditsResponse,
        ] = await Promise.all([
          Axios.get(`/movie/${id}`),
          Axios.get(`/movie/${id}/external_ids`),
          Axios.get(`/movie/${id}/recommendations`),
          Axios.get(`/movie/${id}/similar`),
          Axios.get(`/movie/${id}/videos`),
          Axios.get(`/movie/${id}/watch/providers`),
          Axios.get(`/movie/${id}/credits`),
        ]);

        const movieData = movieResponse.data;
        const externalIds = externalIdsResponse.data;
        const recommendations = recommendationsResponse.data.results;
        const similar = similarResponse.data.results;
        const videos = videosResponse.data.results.find(
          (m) => m.type === "Trailer"
        );
        const watchProviders = watchProvidersResponse.data.results.IN;
        const credits = creditsResponse.data;

        const allDetails = {
          movieData,
          externalIds,
          recommendations,
          similar,
          videos,
          watchProviders,
          credits,
        };

        setUltimateDetails(allDetails);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setError("Error fetching movie details. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id, setUltimateDetails, setIsLoading, setError]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-white">{error}</div>;
  }

  return ultimateDetails ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.4),rgba(0,0,0,0.9)),
      url(https://image.tmdb.org/t/p/original/${ultimateDetails?.movieData?.backdrop_path})`,
        backgroundPosition: "top 7%",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="h-fit w-full px-[10%]"
    >
      {/* nav area */}
      <nav className="w-full text-zinc-100 flex gap-10 text-xl h-[10vh] items-center">
        <Link>
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-go-back-line cursor-pointer mr-1"
          ></i>
        </Link>
        <a target="_blank" href={ultimateDetails?.movieData?.homepage}>
          <i className="hover:text-[#6556CD] ri-links-fill"></i>
        </a>
        <a href="/">
          <i className="hover:text-[#6556CD] ri-home-2-line"></i>
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
          className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] w-[280px] h-[450px] object-cover "
          src={`https://image.tmdb.org/t/p/original/${
            ultimateDetails?.movieData?.poster_path ||
            ultimateDetails?.movieData?.backdrop_path
          }`}
          alt=""
        />

        <div className="content ml-[5%] flex flex-col">
          <h1 className="text-5xl font-semibold">
            {ultimateDetails?.movieData?.name ||
              ultimateDetails?.movieData?.title ||
              ultimateDetails?.movieData?.original_name ||
              ultimateDetails?.movieData?.original_title}
            <small className="text-2xl font-bold text-zinc-300">
              ({ultimateDetails?.movieData?.release_date.split("-")[0]})
            </small>
          </h1>

          <h1>Runtime: {ultimateDetails?.movieData?.runtime} minutes</h1>
          <h1>Released : {ultimateDetails?.movieData?.release_date}</h1>
          <h1 className="text-xl my-2 font-semibold italic">
            {ultimateDetails?.movieData?.tagline}
          </h1>
          <div className="flex items-center text-white">
            <p className="mb-2.5 mr-2">Genres:</p>
            {ultimateDetails?.movieData?.genres.map((genre) => (
              <span
                key={genre?.id}
                className="bg-[#000000aa]  px-2 py- rounded-lg mr-2 mb-2"
              >
                {genre?.name}
              </span>
            ))}
          </div>
          <h1 className="text-2xl mt-1">Overview</h1>
          <p className="mb-10">{ultimateDetails?.movieData?.overview}</p>
          <Link
            className="w-[21vh] p-10 rounded-lg bg-[#000000aa] px-5 py-5"
            to={`https://www.youtube.com/watch?v=${ultimateDetails?.videos?.key}`}
            target="_blank"
          >
            <i className="ri-play-fill text-xl"></i>
            Watch Trailer
          </Link>
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
                      src={`https://image.tmdb.org/t/p/original/${w?.logo_path}`}
                      alt=""
                    />
                  ))}
                </div>
              )}

            {ultimateDetails?.watchProviders &&
              ultimateDetails?.watchProviders?.rent && (
                <div className="flex gap-x-10 items-center text-white">
                  <h1>Rent</h1>
                  {ultimateDetails?.watchProviders?.rent.map((w, i) => (
                    <img
                      key={i}
                      title={w?.provider_name}
                      className="h-[5vh] w-[5vh] object-cover rounded-md"
                      src={`https://image.tmdb.org/t/p/original/${w?.logo_path}`}
                      alt=""
                    />
                  ))}
                </div>
              )}

            {ultimateDetails?.watchProviders &&
              ultimateDetails?.watchProviders?.buy && (
                <div className="flex gap-x-10 items-center text-white">
                  <h1>Buy</h1>
                  {ultimateDetails?.watchProviders?.buy.map((w, i) => (
                    <img
                      key={i}
                      title={w?.provider_name}
                      className="h-[5vh] w-[5vh] object-cover rounded-md"
                      src={`https://image.tmdb.org/t/p/original/${w?.logo_path}`}
                      alt=""
                    />
                  ))}
                </div>
              )}
          </div>
        </div>
      </div>


      {/* cast */}
      <hr className="mt-10 mb-1 border-none h-[2px] bg-zinc-500" />
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
                src={
                  s?.profile_path
                    ? `https://image.tmdb.org/t/p/original/${s?.profile_path}`
                    : noimage
                }
                alt=""
              />
              <div className="flex flex-col">
                {s?.original_name.length > 15 ? (
                  <h1 className="text-2xl text-zinc-100 mt-3 font-semibold">
                    {s?.original_name.slice(0, 17)}...
                    <span>&nbsp;&nbsp;</span>
                  </h1>
                ) : (
                  <h1 className="text-2xl text-zinc-100 mt-3 font-semibold">
                    {s?.original_name}
                    <span>&nbsp;&nbsp;</span>
                  </h1>
                )}

                <h1 className="italic font-semibold text-zinc-500">
                  {s?.character}
                </h1>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default MovieDetails;
