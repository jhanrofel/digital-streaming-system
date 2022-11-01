import { BrowserRouter, Routes, Route } from "react-router-dom";
import Actors from "./pages/Actors";
import Dashboard from "./pages/Dashboard";
import Movies from "./pages/Movies";
import Reviews from "./pages/Reviews";
import Users from "./pages/Users";
import Welcome from "./pages/Welcome";
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
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/*" element={<PageNotFound />}></Route>
        </Route>
        <Route path="/" element={<PrivateLayout />}>
          <Route path="/actors" element={<Actors />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/movies" element={<Movies />}></Route>
          <Route path="/reviews" element={<Reviews />}></Route>
          <Route path="/users" element={<Users />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
