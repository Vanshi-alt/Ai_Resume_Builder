import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getAllResumeData } from "@/Services/resumeAPI";
import AddResume from "./components/AddResume";
import ResumeCard from "./components/ResumeCard";

function Dashboard() {
  const user = useSelector((state) => state.editUser.userData);
  const [resumeList, setResumeList] = React.useState([]);

  const fetchAllResumeData = async () => {
    try {
      const resumes = await getAllResumeData();
      setResumeList(resumes.data);
    } catch (error) {
      console.log("Error from dashboard", error.message);
    }
  };

  useEffect(() => {
    fetchAllResumeData();
  }, [user]);

  return (
    <div className="min-h-screen px-6 md:px-16 lg:px-28 py-12 
      bg-[#05060A] text-white">

      {/* HEADER */}
      <div className="mb-12">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight
          bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400
          bg-clip-text text-transparent">
          My Resumes
        </h2>

        <p className="text-gray-400 mt-3 text-sm md:text-base max-w-xl">
          Build, edit and manage your AI-powered resumes in one place.
        </p>
      </div>

      {/* GRID */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

        {/* ADD RESUME */}
        <div className="group relative rounded-2xl p-[1px] 
          bg-gradient-to-r from-indigo-500/40 via-purple-500/40 to-pink-500/40
          hover:from-indigo-400 hover:to-pink-400 transition">

          <div className="h-full rounded-2xl bg-gray-950/60 backdrop-blur-xl border border-white/10">
            <AddResume />
          </div>
        </div>

        {/* RESUME LIST */}
        {resumeList.length > 0 &&
          resumeList.map((resume) => (
            <div
              key={resume._id}
              className="group relative rounded-2xl p-[1px]
                bg-gradient-to-r from-white/10 to-white/5
                hover:from-indigo-500/40 hover:to-pink-500/40 transition"
            >
              <div className="h-full rounded-2xl bg-gray-950/60 backdrop-blur-xl border border-white/10">
                <ResumeCard
                  resume={resume}
                  refreshData={fetchAllResumeData}
                />
              </div>
            </div>
          ))}

      </div>
    </div>
  );
}

export default Dashboard;