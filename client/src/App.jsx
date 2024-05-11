import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Trending from "./components/Trending";
import Popular from "./components/Popular";
import Movie from "./components/Movie";
import TVShows from "./components/TVShows";
import People from "./components/People";
import MovieDetails from "./components/MovieDetails";
import TVDetails from "./components/TVDetails";
import PersonDetails from "./components/PersonDetails";
import About from "./components/About";


function App() {
  return (
    <div className="w-full h-[100vh] flex">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/movie/details/:id" element={<MovieDetails />} />
        <Route path="/tv" element={<TVShows />} />
        <Route path="/tv/details/:id" element={<TVDetails />} />
        <Route path="/person" element={<People />} />
        <Route path="/person/details/:id" element={<PersonDetails />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
