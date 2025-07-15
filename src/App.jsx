import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import AuthPage from "./pages/AuthPage";
import Navbar from "./components/Navbar";

function App() {
  const location = useLocation();
  
  const hideNavbar = location.pathname === "/";
  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
