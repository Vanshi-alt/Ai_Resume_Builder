import React from "react";

function SummaryPreview({ resumeInfo }) {
  if (!resumeInfo?.summary) return null;

  return (
    <div className="resume-section mt-4">

      {/* Section Heading */}
      <h2 className="text-sm font-bold uppercase "
      style={{ color: resumeInfo?.themeColor || "#000" }}>
        Professional Summary
      </h2>

      {/* Divider */}
      <div className="border-b" style={{ borderColor: resumeInfo?.themeColor }} mt-1 mb-2></div>

      {/* Summary Text */}
      <p className="text-sm text-gray-800 leading-4 text-justify mt-1">
        {resumeInfo?.summary}
      </p>

    </div>
  );
}

export default SummaryPreview;