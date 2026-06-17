import React from "react";

function ProjectPreview({ resumeInfo }) {
  const projects = resumeInfo?.projects || [];

  if (projects.length === 0) return null;

  return (
    <div className=" resume-section mt-2">

      {/* Section Heading */}
      <h2 className="text-sm font-bold uppercase "
      style={{ color: resumeInfo?.themeColor || "#000" }}>
        Projects
      </h2>

      {/* Divider */}
      <div className="border-b" style={{ borderColor: resumeInfo?.themeColor }} mt-1 mb-2></div>

      {/* Project List */}
      {projects.map((project, index) => (
        <div key={index} className="mb-2">

          {/* Project Name */}
          <h3 className="text-sm font-bold mt-1"
          style={{ color: resumeInfo?.themeColor || "#000" }}>
            {project?.projectName}
          </h3>

          {/* Tech Stack */}
          {project?.techStack && (
            <p className="text-sm  mt-1"
            style={{ color: resumeInfo?.themeColor || "#000" }}>
              <span className="font-semibold">Tech Stack:</span>{" "}
              {project.techStack.split(",").join(" | ")}
            </p>
          )}

          {/* Project Summary */}
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
              __html: Array.isArray(project?.projectSummary)
                ? `<ul>${project.projectSummary.join("")}</ul>`
                : project?.projectSummary || "",
            }}
          />

        </div>
      ))}
    </div>
  );
}

export default ProjectPreview;