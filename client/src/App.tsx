import { BrowserRouter, Routes, Route } from "react-router-dom";
import Actors from "./pages/Actors";
import ActorDetails from "./pages/Actors/ActorDetails";
import ActorMovies from "./pages/Actors/ActorMovies";
import Movies from "./pages/Movies";
import MoviesAll from "./pages/Movies/MoviesAll";
import MovieDetails from "./pages/Movies/MovieDetails";
import Reviews from "./pages/Reviews";
import Users from "./pages/Users";
import UserEdit from "./pages/Users/UserEdit";
import Welcome from "./pages/Welcome";
import Search from "./pages/Search";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import PublicLayout from "./pages/Layout/PublicLayout";
import PrivateLayout from "./pages/Layout/PrivateLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route path="/" element={<Welcome />}></Route>
          <Route path="/search" element={<Search />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/*" element={<PageNotFound />}></Route>
          <Route path="/actors-details" element={<ActorDetails />}></Route>
          <Route path="/movies-details" element={<MovieDetails />}></Route>
          <Route path="/movies-all" element={<MoviesAll />}></Route>
        </Route>
        <Route path="/" element={<PrivateLayout />}>
          <Route path="/actors" element={<Actors />}></Route>
          <Route path="/actors-movies" element={<ActorMovies />}></Route>
          <Route path="/movies" element={<Movies />}></Route>
          <Route path="/reviews" element={<Reviews />}></Route>
          <Route path="/users" element={<Users />}></Route>
          <Route path="/users-edit" element={<UserEdit />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
