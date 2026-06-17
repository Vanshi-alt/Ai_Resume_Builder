import React from "react";
import { useSelector } from "react-redux";

import PersonalDeatailPreview from "./preview-components/PersonalDeatailPreview";
import SummeryPreview from "./preview-components/SummaryPreview";
import ExperiencePreview from "./preview-components/ExperiencePreview";
import EducationalPreview from "./preview-components/EducationalPreview";
import SkillsPreview from "./preview-components/SkillsPreview";
import ProjectPreview from "./preview-components/ProjectPreview";

function PreviewPage() {
  const resumeData = useSelector((state) => state.editResume.resumeData);

  return (
  <div className="flex justify-center bg-gray-100 print:block">

      {/* Resume Container */}
     <div
  className="bg-white w-full max-w-[800px]"
  style={{
    fontFamily: "Arial, sans-serif",
    fontSize: "12px",
    lineHeight: "1.4",
  }}
>

        <PersonalDeatailPreview resumeInfo={resumeData} />

        <SummeryPreview resumeInfo={resumeData} />

        <SkillsPreview resumeInfo={resumeData} />

        {resumeData?.experience?.length > 0 && (
          <ExperiencePreview resumeInfo={resumeData} />
        )}

        {resumeData?.projects?.length > 0 && (
          <ProjectPreview resumeInfo={resumeData} />
        )}

        {resumeData?.education?.length > 0 && (
          <EducationalPreview resumeInfo={resumeData} />
        )}

      </div>
    </div>
  );
}

export default PreviewPage;