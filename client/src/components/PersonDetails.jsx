// PersonDetails.jsx
import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import Axios from "../utils/Axios";
import Loading from "./Loading";
import noimage from "../../public/noimage.jpg";
import {
  personDetailsState,
  personMoviesState,
  personSocialsState,
  isPersonLoadingState,
  personErrorState,
} from "../utils/Atoms";

function PersonDetails() {
  document.title = "Person Details";
  const { id } = useParams();
  const [personDetails, setPersonDetails] = useRecoilState(personDetailsState);
  const [personMovies, setPersonMovies] = useRecoilState(personMoviesState);
  const [socials, setSocials] = useRecoilState(personSocialsState);
  const [isLoading, setIsLoading] = useRecoilState(isPersonLoadingState);
  const [error, setError] = useRecoilState(personErrorState);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [personResponse, moviesResponse, socialResponse] =
          await Promise.all([
            Axios.get(`/person/${id}`),
            Axios.get(`/person/${id}/movie_credits`),
            Axios.get(`/person/${id}/external_ids`),
          ]);
        setPersonDetails(personResponse.data);
        setPersonMovies(moviesResponse.data);
        setSocials(socialResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, setPersonDetails, setPersonMovies, setSocials, setIsLoading, setError]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-white">{error}</div>;
  }

  const validCast = personMovies?.cast.filter((item) => item.vote_average > 5);
  const randomNumber = Math.floor(Math.random() * validCast.length + 1);
  const backgroundImg = validCast[randomNumber]?.backdrop_path
    ? `https://image.tmdb.org/t/p/original/${validCast[randomNumber].backdrop_path}`
    : "https://img.freepik.com/premium-photo/pastel-tone-black-red-purple-gradient-defocused-abstract-photo-color-background_640734-17.jpg";

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.9)), url(${backgroundImg})`,
        backgroundPosition: "center 7%",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="w-full h-fit px-[10%]"
    >
      {/* Navigation */}
      <nav className="w-full text-zinc-100 flex gap-10 text-xl h-[10vh] items-center">
        <Link>
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-go-back-line cursor-pointer mr-1"
          ></i>
        </Link>
        <a href="/">
          <i className="hover:text-[#6556CD] ri-home-2-line"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.imdb.com/name/${personDetails?.imdb_id}`}
          className="hover:text-[#6556CD]"
        >
          imdb
        </a>
      </nav>

      {/* poster */}

      <div className="w-full flex ">
        <img
          className="shadow-[8px_17px_38px_2px_rgba(0,0,0,2)] h-[60vh] min-w-[38vh] object-cover"
          src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2${personDetails?.profile_path}`}
          alt=""
        />

        <div className="content ml-[5%]">
          <h1 className="text-5xl font-semibold">{personDetails?.name}</h1>

          {personDetails?.also_known_as.length > 0 && (
            <div className="flex mt-4">
              <h1 className="italic text-sm font-semibold text-zinc-400">
                ({" "}
                {personDetails?.also_known_as.map((p, i) => (
                  <React.Fragment key={i}>
                    <span>{p}</span>
                    {i !== personDetails?.also_known_as.length - 1 && (
                      <span>, </span>
                    )}
                  </React.Fragment>
                ))}
                )
              </h1>
            </div>
          )}

          <h1 className="text-md mt-1">
            {personDetails?.biography.slice(0, 1200)}...
          </h1>
          <p className="mb-10"></p>

          {/* socials */}
          {(socials?.instagram_id ||
            socials?.facebook_id ||
            socials?.twitter_id) && (
            <div className="mt-10 flex items-center text-white">
              <h1 className="text-2xl mr-3 mt-[-5px]">Socials </h1>
              <Link
                target="_blank"
                to={`https://instagram.com/${socials?.instagram_id}`}
              >
                <i className="ri-instagram-line text-2xl mr-3"></i>
              </Link>
              <Link
                target="_blank"
                to={`https://twitter.com/${socials?.twitter_id}`}
              >
                <i className="ri-twitter-x-line text-2xl mr-3"></i>
              </Link>
              <Link
                target="_blank"
                to={`https://facebook.com/${socials?.facebook_id}`}
              >
                <i className="ri-facebook-circle-fill text-2xl mr-3"></i>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* popular movies */}

      <hr className="mt-5 mb-5 border-none h-[2px] bg-zinc-500" />
      <h1 className="text-3xl font-semibold text-white">Appears on</h1>

      <div className="w-[85vw] flex overflow-y-hidden mb-5 p-5">
        {validCast.map((s, i) => (
          <div key={i} className="w-[30vh] mr-[5%]">
            <Link to={`/movie/details/${s?.id}`}>
              <img
                className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] min-w-[15vw] h-[50vh] object-cover"
                src={
                  s?.poster_path
                    ? `https://image.tmdb.org/t/p/original${s.poster_path}`
                    : noimage
                }
                alt=""
              />
            </Link>
            <div className="flex items-center">
              {s?.title.length > 15 ? (
                <h1 className="text-lg text-zinc-100 mt-3 font-semibold">
                  {s?.title.slice(0, 15)}...
                  <span>&nbsp;&nbsp;</span>
                </h1>
              ) : (
                <h1 className="text-lg text-zinc-100 mt-3 font-semibold">
                  {s?.title.slice(0, 15)}
                  <span>&nbsp;&nbsp;</span>
                </h1>
              )}
              <h1 className="text-lg text-zinc-100 mt-3 font-semibold">
                {" "}
                {s?.release_date.split("-")[0]}
              </h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PersonDetails;
