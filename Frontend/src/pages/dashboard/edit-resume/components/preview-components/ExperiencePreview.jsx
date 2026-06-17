import React from "react";

function ExperiencePreview({ resumeInfo }) {
  const experiences = resumeInfo?.experience || [];

  if (experiences.length === 0) return null;

  return (
    <div className="resume-section mt-4">

      {/* Section Heading */}
      <h2 className="text-sm font-bold uppercase mt-1"
      style={{ color: resumeInfo?.themeColor || "#000" }}>
        Professional Experience
      </h2>

      {/* Divider */}
      <div className="border-b" style={{ borderColor: resumeInfo?.themeColor }} mt-1 mb-3></div>

      {/* Experience List */}
      {experiences.map((exp, index) => (
        <div key={index} className="mb-2">

          {/* Role */}
          <h3 className="text-sm font-bold "
          style={{ color: resumeInfo?.themeColor || "#111" }}>
            {exp?.title}
          </h3>

          {/* Company + Date */}
          <div className="flex justify-between text-sm text-gray-700 mt-1">

            <span>
              {exp?.companyName}
              {exp?.city ? `, ${exp.city}` : ""}
              {exp?.state ? `, ${exp.state}` : ""}
            </span>

            <span>
              {exp?.startDate} -{" "}
              {exp?.currentlyWorking ? "Present" : exp?.endDate}
            </span>

          </div>

          {/* Work Summary */}
          <div
            className="text-sm text-gray-800 mt-1 leading-4
             [&_ul]:list-disc
             [&_ul]:pl-4
             [&_ul]:m-0
             [&_ul]:my-0
             [&_li]:m-0
             [&_li]:p-0
             [&_*]:!text-gray-800"
            dangerouslySetInnerHTML={{
              __html: exp?.workSummary || "",
            }}
          />

        </div>
      ))}
    </div>
  );
}

export default ExperiencePreview;