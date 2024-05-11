import { Link } from "react-router-dom";
import logo from "../../assets/logo-no-background.png";
import Topnav from "./Topnav";

const Navbar = () => {
  return (
    <div className=" flex justify-between items-center w-full h-[10vh] ">
      <div className="w-fit h-12">
        <img className="w-[25vh] object-contain h-full" src={logo} alt="" />
      </div>
      <Topnav/>
      <nav className="hidden md:hidden lg:flex text-zinc-200  text-md gap-1 items-center">
        {/* <h1 className="text-white font-semibold text-xl mt-7 mb-3">Feed</h1> */}
        <Link
          to="/trending"
          className="hover:bg-[#2EA423] hover:text-white duration-300 rounded-lg px-5 py-2 flex gap-2"
        >
          {/* <i className="ri-fire-fill"></i> */}
          Trending
        </Link>
        <Link
          to="/popular"
          className="hover:bg-[#2EA423] hover:text-white duration-300 rounded-lg px-5 py-2 flex gap-2"
        >
          {/* <i className="ri-bard-fill"></i> */}
          Popular
        </Link>
        <Link
          to="/movie"
          className="hover:bg-[#2EA423] hover:text-white duration-300 rounded-lg px-5 py-2 flex gap-2"
        >
          {/* <i className="ri-movie-line"></i> */}
          Bollywood
        </Link>
        <Link
          to="/tv"
          className="hover:bg-[#2EA423] hover:text-white duration-300 rounded-lg px-5 py-2 flex gap-2"
        >
          {/* <i className="ri-movie-2-fill"></i> */}
          Shows
        </Link>
        <Link
          to="/person"
          className="hover:bg-[#2EA423] hover:text-white duration-300 rounded-lg px-5 py-2 flex gap-2"
        >
          {/* <i className="ri-team-fill"></i> */}
          People
        </Link>
        <Link
          to="/about"
          className="hover:bg-[#2EA423] hover:text-white duration-300 rounded-lg px-5 py-2 flex gap-2"
        >
          {/* <i className="ri-information-2-fill"></i>  */}
          About
        </Link>
      </nav>

      {/* <hr className="border-none h-[1px] bg-zinc-400" />
      <nav className="flex flex-col text-zinc-400 text-xl gap-1">
        <h1 className="text-white font-semibold text-xl mt-7 mb-3">
          Website Info
        </h1>
        <Link
          to="/about"
          className="hover:bg-[#2EA423] hover:text-white duration-300 rounded-lg p-5 flex gap-2"
        >
          <i className="ri-information-2-fill"></i> About
        </Link>
        <Link
          target="_blank"
          to="https://www.linkedin.com/in/hey-akshit/"
          className="hover:bg-[#2EA423] hover:text-white duration-300 rounded-lg p-5 flex gap-2"
        >
          <i className="ri-copyright-line"></i> Akshit 2024
        </Link>
      </nav> */}
    </div>
  );
};

export default Navbar;