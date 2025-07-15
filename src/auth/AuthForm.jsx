// src/components/AuthForm.jsx
import { auth } from "../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { setAuthLoading, setUser, setAuthError } from "./services/authSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "./services/authServices";
import Alert from "@mui/material/Alert";

const AuthForm = ({ isLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    if (isLogin) {
      dispatch(loginUser(email, password))
        .then(() => navigate("/home"))
        .catch((err) => setError(err.message));

      // navigate("/home");
    } else {
      if (password !== confirmPassword) {
        alert("password and confirm password does'nt match!!!");
        return;
      }
      dispatch(registerUser(email, password));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <Alert variant="filled" severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      )}
      {!isLogin && (
        <input
          type="text"
          placeholder="Full Name"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      )}

      <input
        type="email"
        placeholder="Email"
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
        onChange={(e) => setPassword(e.target.value)}
      />

      {!isLogin && (
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      )}

      <button
        type="submit"
        className="w-full bg-indigo-400 hover:bg-indigo-700 text-white font-bold py-2 rounded-md transition"
      >
        {isLogin ? "Login" : "Register"}
      </button>

      {isLogin && (
        <p className="text-sm text-right text-indigo-600 hover:underline cursor-pointer">
          Forgot Password?
        </p>
      )}
    </form>
  );
};

export default AuthForm;
