import React, { useEffect } from "react";
import logo from "/logo.svg";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/Services/login";
import { addUserData } from "@/features/user/userFeatures";

function Header({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      console.log("Printing From Header User Found");
    } else {
      console.log("Printing From Header User Not Found");
    }
  }, []);

  const handleLogout = async () => {
    try {
      const response = await logoutUser();
      if (response.statusCode == 200) {
        dispatch(addUserData(""));
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <header
      id="printHeader"
      className="sticky top-0 z-50 w-full border-b border-white/10 backdrop-blur-xl bg-slate-950/80"
    >
      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
        
        {/* Logo Section */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="p-2 rounded-2xl bg-gradient-to-br from-violet-600 to-blue-600 shadow-lg">
            <img src={logo} alt="logo" width={38} height={38} />
          </div>

          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              ResumeAI
            </h1>
            <p className="text-xs text-slate-400">
              Build smarter resumes
            </p>
          </div>
        </div>

        {/* Right Side */}
        {user ? (
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => {
                navigate("/dashboard");
              }}
              className="border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800 rounded-xl px-5 transition-all"
            >
              Dashboard
            </Button>

            <Button
              onClick={handleLogout}
              className="bg-gradient-to-r from-violet-600 to-blue-600 hover:scale-105 transition-all rounded-xl px-6 shadow-lg"
            >
              Logout
            </Button>
          </div>
        ) : (
          <Link to="/auth/sign-in">
            <Button className="bg-gradient-to-r from-violet-600 to-blue-600 hover:scale-105 transition-all rounded-xl px-6 shadow-lg">
              Get Started
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;