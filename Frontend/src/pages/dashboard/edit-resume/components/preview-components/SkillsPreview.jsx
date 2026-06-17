import React from "react";

function SkillsPreview({ resumeInfo }) {
  const skills = resumeInfo?.skills || [];

  if (skills.length === 0) return null;

  return (
    <div className="resume-section mt-4">

      {/* Section Heading */}
      <h2 className="text-sm font-bold uppercase "
      style={{ color: resumeInfo?.themeColor || "#000" }}>
        Technical Skills
      </h2>

      {/* Divider */}
      <div className="border-b" style={{ borderColor: resumeInfo?.themeColor }} mt-1 mb-2></div>

      {/* Skills List */}
      <p className="text-sm text-gray-800 leading-4 mt-1">
        {skills
          .map((skill) => skill.name)
          .filter(Boolean)
          .join(" • ")}
      </p>

    </div>
  );
}

export default SkillsPreview;