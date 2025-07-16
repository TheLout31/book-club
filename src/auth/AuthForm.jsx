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
import Toast from "../components/Toast";

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
    if (!email || !password) {
      setError("Fill the Fields");
      return;
    }
    if (isLogin) {
      dispatch(loginUser(email, password))
        .then(() => navigate("/home"))
        .catch((err) => setError(err.message));

      // navigate("/home");
    } else {
      if (password !== confirmPassword) {
        setError("Confirm password does'nt match!!!");
        return;
      }
      dispatch(registerUser(email, password));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <Toast
          variant="filled"
          severity="error"
          children={error}
          onClose={() => setError(null)}
        />
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
