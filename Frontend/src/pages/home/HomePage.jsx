import Header from "@/components/custom/Header";
import React, { useEffect } from "react";
import heroSnapshot from "@/assets/heroSnapshot.png";
import { useNavigate } from "react-router-dom";
import { FaGithub, FaCircle, FaInfoCircle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { startUser } from "../../Services/login.js";
import { useDispatch, useSelector } from "react-redux";
import { addUserData } from "@/features/user/userFeatures.js";

function HomePage() {
  const user = useSelector((state) => state.editUser.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    window.open(
      "https://github.com/sahidrajaansari/Ai-Resume-Builder",
      "_blank"
    );
  };

  useEffect(() => {
    const fetchResponse = async () => {
      try {
        const response = await startUser();
        if (response.statusCode == 200) {
          dispatch(addUserData(response.data));
        } else {
          dispatch(addUserData(""));
        }
      } catch (error) {
        dispatch(addUserData(""));
      }
    };
    fetchResponse();
  }, []);

  const handleGetStartedClick = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/auth/sign-in");
    }
  };

  return (
    <>

      {/* HERO */}
      <section className="min-h-screen pt-28 pb-24 
        bg-[#05060A] text-white relative overflow-hidden">

        {/* background glow */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.25),transparent_60%)]"></div>

        <div className="relative px-6 mx-auto max-w-7xl">

          {/* TEXT */}
          <div className="text-center max-w-4xl mx-auto">

            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Build{" "}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 text-transparent bg-clip-text">
                AI-Powered Resumes
              </span>{" "}
              that get you hired
            </h1>

            <p className="mt-6 text-gray-400 text-base md:text-xl">
              Create professional resumes in minutes using AI suggestions, smart formatting, and modern templates.
            </p>

            {/* BUTTONS */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">

              <button
                onClick={handleGetStartedClick}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 
                hover:scale-105 transition shadow-lg shadow-purple-500/20"
              >
                Get Started
              </button>

              <button
                onClick={handleClick}
                className="px-8 py-3 rounded-xl bg-white/5 border border-white/10 
                hover:bg-white/10 transition"
              >
                View GitHub
              </button>

            </div>
          </div>

          {/* HERO PREVIEW */}
          <div className="mt-16 flex justify-center">
            <div className="relative w-full max-w-5xl">

              <div className="absolute -inset-6 bg-gradient-to-r from-purple-600/20 to-cyan-500/20 blur-3xl"></div>

              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">

                {/* window bar */}
                <div className="flex items-center justify-between px-4 h-10 bg-white/5 border-b border-white/10">

                  <div className="flex gap-2">
                    <FaCircle className="text-red-400 text-xs" />
                    <FaCircle className="text-yellow-400 text-xs" />
                    <FaCircle className="text-green-400 text-xs" />
                  </div>

                  <FaInfoCircle className="text-white/50 text-sm" />

                </div>

                <img
                  src={heroSnapshot}
                  alt="Dashboard Preview"
                  className="w-full hover:scale-[1.02] transition duration-500"
                />
              </div>
            </div>
          </div>

          {/* FEATURES */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">

            {[
              {
                title: "AI Powered",
                desc: "Smart resume generation with AI suggestions",
              },
              {
                title: "Modern UI",
                desc: "Glassmorphism + premium SaaS design system",
              },
              {
                title: "Instant Export",
                desc: "Download professional resumes instantly",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white/5 border border-white/10
                hover:bg-white/10 transition"
              >
                <h3 className="font-bold text-lg">{item.title}</h3>
                <p className="text-gray-400 text-sm mt-2">{item.desc}</p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#05060A] text-white border-t border-white/10 py-8 px-6">

        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">

          <p className="text-gray-500 text-sm">
            © 2026 AI Resume Builder
          </p>

          <Button
            onClick={handleClick}
            className="bg-white/5 hover:bg-white/10 border border-white/10"
          >
            <FaGithub className="mr-2" />
            GitHub
          </Button>

        </div>

      </footer>
    </>
  );
}

export default HomePage;