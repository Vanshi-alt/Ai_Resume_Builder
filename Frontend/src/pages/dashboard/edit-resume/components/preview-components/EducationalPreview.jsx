import React from "react";

function EducationalPreview({ resumeInfo }) {
  const educationList = resumeInfo?.education || [];

  if (educationList.length === 0) return null;

  return (
    <div className="resume-section mt-4">

      {/* Section Heading */}
      <h2 className="text-sm font-bold uppercase "
      style={{ color: resumeInfo?.themeColor || "#000" }}>
        Education
      </h2>

      {/* Divider */}
      <div className="border-b" style={{ borderColor: resumeInfo?.themeColor }} mt-1 mb-3></div>

      {/* Education List */}
      {educationList.map((edu, index) => (
        <div key={index} className="mb-2">

          {/* Degree */}
          <h3 className="text-sm font-bold mt-1"
          style={{ color: resumeInfo?.themeColor || "#111" }}>
            {edu?.degree}
            {edu?.major ? ` - ${edu.major}` : ""}
          </h3>

          {/* College */}
          <p className="text-xs text-gray-700 mt-0">
            {edu?.universityName}
          </p>

          {/* Location + Dates */}
          <div className="flex justify-between text-xs text-gray-600 mt-0">

            <span>
              {edu?.city || ""}
            </span>

            <span>
              {edu?.startDate} - {edu?.endDate || "Present"}
            </span>

          </div>

          {/* Optional Description */}
          {edu?.description && (
            <p className="text-sm text-gray-800 mt-2 leading-4">
              {edu.description}
            </p>
          )}

        </div>
      ))}
    </div>
  );
}

export default EducationalPreview;