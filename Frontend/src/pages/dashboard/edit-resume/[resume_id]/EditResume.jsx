import React, { useEffect } from "react";
import ResumeForm from "../components/ResumeForm";
import PreviewPage from "../components/PreviewPage";
import { useParams } from "react-router-dom";
import { getResumeData } from "@/Services/resumeAPI";
import { useDispatch } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";

export function EditResume() {
  const { resume_id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    getResumeData(resume_id).then((data) => {
      dispatch(addResumeData(data.data));
    });
  }, [resume_id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1220] via-[#111827] to-[#0b0f19] text-white">

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 pt-10 pb-6">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
          Resume Builder
        </h1>
        <p className="text-sm text-gray-400 mt-2">
          Edit your resume and see live preview updates
        </p>
      </div>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-10 grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Left Panel - Form */}
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-xl hover:shadow-2xl transition">
          <div className="px-6 py-4 border-b border-white/10">
            <h2 className="text-lg font-semibold text-white">
              Edit Details
            </h2>
          </div>

          <div className="p-6">
            <ResumeForm />
          </div>
        </div>

        {/* Right Panel - Preview (kept light as you wanted) */}
        <div className="rounded-2xl border bg-white shadow-xl hover:shadow-2xl transition">
          <div className="px-6 py-4 border-b bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-700">
              Live Preview
            </h2>
          </div>

          <div className="p-6">
            <PreviewPage />
          </div>
        </div>

      </div>
    </div>
  );
}

export default EditResume;