import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import AuthPage from "./pages/AuthPage";
import Navbar from "./components/Navbar";
import Discussion from "./pages/Discussion";
import BookMarks from "./pages/BookMarks";
import SearchBooks from "./pages/SearchBooks";

function App() {
  const location = useLocation();

  const hideNavbar = location.pathname === "/";
  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/findbooks" element={<SearchBooks />} />
        <Route path="/bookmarks" element={<BookMarks />} />
        <Route path="/discussions" element={<Discussion />} />
      </Routes>
    </>
  );
}

export default App;
