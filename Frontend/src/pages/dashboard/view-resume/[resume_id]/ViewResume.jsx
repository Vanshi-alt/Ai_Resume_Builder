import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getResumeData } from "@/Services/resumeAPI";
import ResumePreview from "../../edit-resume/components/PreviewPage";
import { useDispatch } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { RWebShare } from "react-web-share";
import { toast } from "sonner";

function ViewResume() {
  const { resume_id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchResumeInfo();
  }, []);

  const fetchResumeInfo = async () => {
    const response = await getResumeData(resume_id);
    dispatch(addResumeData(response.data));
  };

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className=" bg-gray-950 text-white flex flex-col items-center">

      {/* CONTROL PANEL (NO PRINT) */}
      <div id="noPrint" className="w-full flex justify-center">
        <div className="w-full max-w-4xl mt-10 mb-6 p-6 rounded-2xl bg-gray-900 border border-gray-800 shadow-lg">

          <h2 className="text-center text-2xl font-semibold">
            🎉 Your AI Resume is Ready
          </h2>

          <p className="text-center text-gray-400 mt-2 text-sm">
            Download or share your resume instantly with a link
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">

            <Button
              onClick={handleDownload}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6"
            >
              Download PDF
            </Button>

            <RWebShare
              data={{
                text: "Check out my AI generated resume",
                url:
                  import.meta.env.VITE_BASE_URL +
                  "/dashboard/view-resume/" +
                  resume_id,
                title: "AI Resume Builder",
              }}
              onClick={() => toast.success("Resume Shared Successfully")}
            >
              <Button
                variant="outline"
                className="border-gray-600 text-white hover:bg-gray-800"
              >
                Share Resume
              </Button>
            </RWebShare>

          </div>
        </div>
      </div>

      {/* RESUME PREVIEW (LIGHT - KEEP SAME) */}
      <div
        className="bg-white rounded-lg p-8 shadow-xl print-area"
        style={{ width: "210mm", minHeight: "297mm" }}
      >
        <ResumePreview />
      </div>
    </div>
  );
}

export default ViewResume;