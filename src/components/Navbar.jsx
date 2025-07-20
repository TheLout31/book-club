import React from "react";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { clearAuth } from "../auth/services/authSlice";
import { useDispatch } from "react-redux";
import { logoutUser } from "../auth/services/authServices";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const options = ["Bookmarks", "Suggestion", "Discussions"];
  const ITEM_HEIGHT = 48;

  const handleLogOut = () => {
    dispatch(logoutUser())
      .then(() => navigate("/"))
      .catch((err) => setError(err.message));
  };

  return (
    <nav className="bg-indigo-700 text-white shadow-md">
      <div className=" mx-auto lg:px-8">
        <div className="flex justify-between items-center h-16 p-4">
          {/* Logo */}
          <Link to="/home" className="flex-shrink-0 text-4xl font-extrabold ">
            BookVerse
          </Link>

          {/* Right Menu */}
          <div className="hidden md:flex space-x-6">
            <Link
              to="/bookmarks"
              className="hover:bg-white hover:text-indigo-600 transition px-4 py-2 rounded-md font-semibold"
            >
              Bookmarks
            </Link>
            <Link to="/findbooks" className="hover:bg-white hover:text-indigo-600 transition px-4 py-2 rounded-md font-semibold">
              Search
            </Link>
            <Link
              to="/discussions"
              className="hover:bg-white hover:text-indigo-600 transition px-4 py-2 rounded-md font-semibold"
            >
              Discussions
            </Link>
            <button
              className="hover:bg-red-500 transition px-4 py-2 rounded-md font-semibold"
              onClick={() => handleLogOut()}
            >
              Logout
            </button>
          </div>

          <div className="md:hidden">
            <IconButton
              aria-controls={open ? "long-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MenuRoundedIcon style={{ color: "white" }} />
            </IconButton>
            <Menu
              id="long-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              slotProps={{
                paper: {
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: "20ch",
                  },
                },
                list: {
                  "aria-labelledby": "long-button",
                },
              }}
            >
              {options.map((option) => (
                <MenuItem key={option} onClick={handleClose}>
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
