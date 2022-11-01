import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Welcome from "./pages/welcome/Welcome";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import PageNotFound from "./pages/PageNotFound";
import PublicLayout from "./pages/layout/PublicLayout";
import PrivateLayout from "./pages/layout/PrivateLayout";

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
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
