// src/pages/AuthPage.jsx
import { useState, useEffect } from "react";
import AuthForm from "../auth/AuthForm";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser !== null) {
      navigate("/home");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side: Book Reference */}
      <div className="md:w-1/2 bg-gradient-to-tr from-white to-indigo-900 text-white flex flex-col justify-center items-center p-8">
        <h2 className="text-7xl font-bold mb-6">Welcome to BookVerse</h2>
      </div>

      {/* Right Side: Auth Form */}
      <div className="md:w-1/2 flex justify-center items-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-6">
            <button
              className={`px-4 py-2 text-sm font-medium border-b-2 ${
                isLogin ? "border-indigo-500 text-indigo-600" : "text-gray-500"
              }`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium border-b-2 ml-4 ${
                !isLogin ? "border-indigo-500 text-indigo-600" : "text-gray-500"
              }`}
              onClick={() => setIsLogin(false)}
            >
              Register
            </button>
          </div>

          <AuthForm isLogin={isLogin} />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
