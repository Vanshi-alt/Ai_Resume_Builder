import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  ArrowLeft,
  ArrowRight,
  User,
  FileText,
  Briefcase,
  FolderGit2,
  GraduationCap,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import PersonalDetails from "./form-components/PersonalDetails";
import Summary from "./form-components/Summary";
import Experience from "./form-components/Experience";
import Education from "./form-components/Education";
import Skills from "./form-components/Skills";
import Project from "./form-components/Project";
import ThemeColor from "./ThemeColor";

function ResumeForm() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [enabledNext, setEnabledNext] = useState(true);
  const [enabledPrev, setEnabledPrev] = useState(true);

  const resumeInfo = useSelector((state) => state.editResume.resumeData);

  const steps = [
    { name: "Personal", icon: User, component: PersonalDetails },
    { name: "Summary", icon: FileText, component: Summary },
    { name: "Experience", icon: Briefcase, component: Experience },
    { name: "Projects", icon: FolderGit2, component: Project },
    { name: "Education", icon: GraduationCap, component: Education },
    { name: "Skills", icon: Star, component: Skills },
  ];

  const CurrentComponent = steps[currentIndex].component;

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">

      {/* STEP PROGRESS */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-3 md:flex-nowrap items-center justify-between">

          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <button
                onClick={() => setCurrentIndex(index)}
                className={`flex flex-col items-center gap-1 transition-all ${
                  currentIndex === index ? "opacity-100" : "opacity-40"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border transition
                  ${
                    currentIndex === index
                      ? "bg-indigo-600 text-white border-indigo-500 shadow-lg"
                      : "bg-gray-900 text-gray-400 border-gray-800"
                  }`}
                >
                  {React.createElement(step.icon, { size: 18 })}
                </div>

                <span className="text-xs text-gray-300 hidden md:block">
                  {step.name}
                </span>
              </button>

              {index < steps.length - 1 && (
                <div className="flex-1 h-[2px] bg-gray-800 mx-1" />
              )}
            </React.Fragment>
          ))}

        </div>
      </div>

      {/* MAIN FORM CARD */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl overflow-hidden">

        {/* HEADER */}
<div className="px-6 py-4 border-b border-gray-800 bg-gray-950 flex justify-between items-center">
  <div>
    <h2 className="text-xl font-bold text-white">
      {steps[currentIndex].name} Details
    </h2>
    <p className="text-sm text-gray-400">
      Fill your {steps[currentIndex].name.toLowerCase()} information
    </p>
  </div>

  {/* ✅ ADD THIS */}
  <ThemeColor resumeInfo={resumeInfo} />
</div>

        {/* BODY */}
        <div className="p-6">
          <CurrentComponent
            resumeInfo={resumeInfo}
            setEnabledNext={setEnabledNext}
            setEnabledPrev={setEnabledPrev}
          />
        </div>

        {/* NAVIGATION */}
        <div className="px-6 py-4 border-t border-gray-800 bg-gray-950 flex justify-between items-center">

          <Button
            variant="outline"
            onClick={() => setCurrentIndex(currentIndex - 1)}
            disabled={currentIndex === 0 || !enabledPrev}
            className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
          >
            <ArrowLeft size={16} className="mr-1" /> Prev
          </Button>

          <span className="text-sm text-gray-400">
            Step {currentIndex + 1} / {steps.length}
          </span>

          {currentIndex < steps.length - 1 ? (
            <Button
              onClick={() => setCurrentIndex(currentIndex + 1)}
              disabled={!enabledNext}
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              Next <ArrowRight size={16} className="ml-1" />
            </Button>
          ) : (
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              Complete
            </Button>
          )}

        </div>
      </div>
    </div>
  );
}

export default ResumeForm;