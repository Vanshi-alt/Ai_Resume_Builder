import React from "react";

function PersonalDeatailPreview({ resumeInfo }) {
  return (
    <div >

      {/* Full Name */}
      <h1 className="text-2xl font-bold uppercase text-center text-black tracking-wide"
      style={{ color: resumeInfo?.themeColor }}>
        {resumeInfo?.firstName} {resumeInfo?.lastName}
      </h1>

      {/* Job Title */}
      <p className="text-center text-sm text-gray-700 mt-1 font-medium">
        {resumeInfo?.jobTitle}
      </p>

      {/* Contact Details */}
      <div className="text-center text-xs text-gray-600 mt-3 leading-6">

        {resumeInfo?.email && (
          <span>{resumeInfo.email}</span>
        )}

        {resumeInfo?.phone && (
          <>
            {" | "}
            <span>{resumeInfo.phone}</span>
          </>
        )}

        {resumeInfo?.address && (
          <>
            {" | "}
            <span>{resumeInfo.address}</span>
          </>
        )}

      </div>
    </div>
  );
}

export default PersonalDeatailPreview;