import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/welcome/Welcome";
import Register from "./pages/register/Register";
import PublicLayout from "./pages/layout/PublicLayout";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/login/Login";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
