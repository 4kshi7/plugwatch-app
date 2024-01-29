import React from "react";
import { Link, useNavigate } from "react-router-dom";

const About = () => {
  document.title = "About";

  const data = [
    "https://c4.wallpaperflare.com/wallpaper/690/46/390/ryan-gosling-movies-drive-drive-movie-wallpaper-preview.jpg",
    "https://wallpaperset.com/w/full/d/8/d/315171.jpg",
    "https://wallpapercave.com/wp/wp1930566.jpg",
    "https://e0.pxfuel.com/wallpapers/897/626/desktop-wallpaper-better-call-saul-lalo-salamanca-actor-explains-wild-finale-los-angeles-times.jpg",
    "https://wallpapercrafter.com/desktop1/519370-American-Psycho-couch-Christian-Bale-sitting-one.jpg",
    "https://images5.alphacoders.com/642/642963.jpg",
  ];

  const pfp = [
    "https://media1.tenor.com/m/55mQriWoLxoAAAAd/batman.gif",
    "https://media1.tenor.com/m/JWFEQcWcJyQAAAAC/happy-catto-cats.gif",
    "https://media1.tenor.com/m/Wkdq3d9gsv8AAAAd/slaysol-sad-depressed-wolf.gif",
    "https://media1.tenor.com/m/cZpD7GPzPMEAAAAC/walt-walnterwite.gif",
    "https://media1.tenor.com/m/XO4HdNStgRoAAAAd/lalo-salamanca-phone.gif",
    "https://media1.tenor.com/m/nw830_b_6LYAAAAd/sad.gif",
    "https://media1.tenor.com/m/36RegsEbmj4AAAAd/kanye.gif"
  ];

  const randomIndex = Math.floor(Math.random() * data.length);
  const randomIndex2 = Math.floor(Math.random() * pfp.length);
  const backgroundImg = data[randomIndex];
  const backgroundImg2 = pfp[randomIndex2];

  const navigate = useNavigate();

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.9)), url(${backgroundImg})`,
        backgroundPosition: "center 7%",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="w-screen h-full px-[10%]"
    >
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
      </nav>

      <div className="w-full flex">
        <img
          className="shadow-[8px_17px_38px_2px_rgba(0,0,0,2)] w-[40vh] h-[45vh] object-cover "
          src={`${backgroundImg2}`}
          alt=""
        />
        <div className="ml-[4%] flex flex-col gap-5">
          <h1 className="text-3xl font-semibold">PlugWatch Movie App</h1>
          <h1 className="text-lg">
            PlugWatch is your go-to destination for exploring a vast collection
            of movies. Powered by the TMDB API and crafted with React and
            Tailwind, PlugWatch offers a seamless and intuitive user experience.
            Dive into a world of cinematic wonders, discover new favorites, and
            stay up-to-date with the latest releases. Welcome to PlugWatch,
            where every movie awaits your discovery.
          </h1>

          <h1>Made with ❤️ by Akshit</h1>

          <h1 className="text-2xl italic">Lets Connect</h1>
          <div className="flex gap-4">
            <Link
              target="_blank"
              to="https://twitter.com/akshitfr"
              className=""
            >
              <i className="text-2xl hover:text-3xl duration-300 ri-twitter-x-line "></i>
            </Link>
            <Link
              target="_blank"
              to="https://www.linkedin.com/in/hey-akshit/"
              className=""
            >
              <i className="text-3xl hover:text-4xl duration-300  ri-linkedin-box-fill "></i>
            </Link>
            <Link target="_blank" to="https://github.com/4kshi7" className="">
              <i className="text-3xl hover:text-4xl duration-300 ri-github-fill "></i>
            </Link>
            <Link
              target="_blank"
              to="https://open.spotify.com/user/apy11js5u0yp7ms08219ie6g2"
              className=""
            >
              <i className="text-3xl ri-spotify-fill hover:text-4xl duration-300 "></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
