import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import AuthPage from "./pages/AuthPage";
import Navbar from "./components/Navbar";
import Discussion from "./pages/Discussion"

function App() {
  const location = useLocation();
  
  const hideNavbar = location.pathname === "/";
  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/discussions" element={<Discussion/>} />
      </Routes>
    </>
  );
}

export default App;
