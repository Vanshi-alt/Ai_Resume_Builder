import React, { useState } from "react";
import {
  FaUser,
  FaLock,
  FaSignInAlt,
  FaUserPlus,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { loginUser, registerUser } from "@/Services/login";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [signUpError, setSignUpError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInError, setSignInError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignInSubmit = async (event) => {
    setSignInError("");
    event.preventDefault();
    const { email, password } = event.target.elements;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value)) return;

    setLoading(true);

    const data = {
      email: email.value,
      password: password.value,
    };

    try {
      const user = await loginUser(data);
      if (user?.statusCode === 200) {
        navigate("/");
      }
    } catch (error) {
      setSignInError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUpSubmit = async (event) => {
    setSignUpError("");
    event.preventDefault();
    const { fullname, email, password } = event.target.elements;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value)) return;

    setLoading(true);

    const data = {
      fullName: fullname.value,
      email: email.value,
      password: password.value,
    };

    try {
      const response = await registerUser(data);
      if (response?.statusCode === 201) {
        handleSignInSubmit(event);
      }
    } catch (error) {
      setSignUpError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-slate-950 relative overflow-hidden">

      {/* background blur */}
      <div className="absolute w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-3xl top-[-100px] left-[-100px]" />
      <div className="absolute w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-3xl bottom-[-100px] right-[-100px]" />

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md p-8 rounded-3xl border border-slate-700 bg-slate-900/70 backdrop-blur-xl shadow-2xl"
      >
        {/* heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            AI Resume Builder
          </h1>
          <p className="text-slate-400 mt-2 text-sm">
            Build professional resumes powered by AI
          </p>
        </div>

        {/* tabs */}
        <div className="grid grid-cols-2 p-1 rounded-xl bg-slate-800 mb-8">
          <button
            onClick={() => setIsSignUp(false)}
            className={`py-3 rounded-lg font-medium transition ${
              !isSignUp
                ? "bg-violet-600 text-white"
                : "text-slate-400"
            }`}
          >
            Sign In
          </button>

          <button
            onClick={() => setIsSignUp(true)}
            className={`py-3 rounded-lg font-medium transition ${
              isSignUp
                ? "bg-violet-600 text-white"
                : "text-slate-400"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* signup */}
        {isSignUp ? (
          <form onSubmit={handleSignUpSubmit} className="space-y-4">

            <div className="flex items-center gap-3 bg-slate-800 p-4 rounded-xl border border-slate-700">
              <FaUser className="text-slate-400" />
              <input
                type="text"
                name="fullname"
                placeholder="Full Name"
                required
                className="bg-transparent outline-none w-full text-white"
              />
            </div>

            <div className="flex items-center gap-3 bg-slate-800 p-4 rounded-xl border border-slate-700">
              <FaUser className="text-slate-400" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="bg-transparent outline-none w-full text-white"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>

            <div className="flex items-center gap-3 bg-slate-800 p-4 rounded-xl border border-slate-700">
              <FaLock className="text-slate-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                required
                className="bg-transparent outline-none w-full text-white"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-slate-400"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-medium transition"
            >
              {loading ? (
                <Loader2 className="animate-spin mx-auto" />
              ) : (
                "Create Account"
              )}
            </button>

            {signUpError && (
              <p className="text-red-400 text-sm text-center">
                {signUpError}
              </p>
            )}
          </form>
        ) : (
          /* signin */
          <form onSubmit={handleSignInSubmit} className="space-y-4">

            <div className="flex items-center gap-3 bg-slate-800 p-4 rounded-xl border border-slate-700">
              <FaUser className="text-slate-400" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="bg-transparent outline-none w-full text-white"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>

            <div className="flex items-center gap-3 bg-slate-800 p-4 rounded-xl border border-slate-700">
              <FaLock className="text-slate-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                required
                className="bg-transparent outline-none w-full text-white"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-slate-400"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-medium transition"
            >
              {loading ? (
                <Loader2 className="animate-spin mx-auto" />
              ) : (
                "Login"
              )}
            </button>

            {signInError && (
              <p className="text-red-400 text-sm text-center">
                {signInError}
              </p>
            )}
          </form>
        )}

        <p className="mt-6 text-center text-slate-400 text-sm">
          {isSignUp ? "Already have an account?" : "New here?"}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-violet-400 ml-2 hover:underline"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </motion.div>
    </div>
  );
}

export default AuthPage;