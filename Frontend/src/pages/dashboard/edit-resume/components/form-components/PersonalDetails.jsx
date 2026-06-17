import React from "react";
import { useDispatch } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { updateThisResume } from "@/Services/resumeAPI";

function PersonalDetails({ resumeInfo, setEnabledNext }) {
  const { resume_id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);

  const [formData, setFormData] = React.useState({
    firstName: resumeInfo?.firstName || "",
    lastName: resumeInfo?.lastName || "",
    jobTitle: resumeInfo?.jobTitle || "",
    address: resumeInfo?.address || "",
    phone: resumeInfo?.phone || "",
    email: resumeInfo?.email || "",
  });

  const handleInputChange = (e) => {
    setEnabledNext(false);

    dispatch(
      addResumeData({
        ...resumeInfo,
        [e.target.name]: e.target.value,
      })
    );

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSave = async (e) => {
    setLoading(true);
    e.preventDefault();

    const data = {
      data: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        jobTitle: formData.jobTitle,
        address: formData.address,
        phone: formData.phone,
        email: formData.email,
      },
    };

    if (resume_id) {
      try {
        await updateThisResume(resume_id, data);
        toast.success("Resume Updated");
      } catch (error) {
        toast.error(error.message);
      } finally {
        setEnabledNext(true);
        setLoading(false);
      }
    }
  };

  return (
    <div className="mt-10">
      <div className="rounded-2xl border border-gray-800 bg-gray-900 shadow-xl text-white p-6">

        {/* HEADER */}
        <div className="mb-6">
          <h2 className="text-xl font-bold">👤 Personal Details</h2>
          <p className="text-sm text-gray-400">
            Start with your basic information
          </p>
        </div>

        <form onSubmit={onSave} className="space-y-5">

          {/* GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* First Name */}
            <div>
              <label className="text-xs text-gray-400">First Name</label>
              <Input
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="mt-1 bg-gray-950 border-gray-700 text-white"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="text-xs text-gray-400">Last Name</label>
              <Input
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="mt-1 bg-gray-950 border-gray-700 text-white"
              />
            </div>

            {/* Job Title */}
            <div className="md:col-span-2">
              <label className="text-xs text-gray-400">Job Title</label>
              <Input
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleInputChange}
                className="mt-1 bg-gray-950 border-gray-700 text-white"
              />
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label className="text-xs text-gray-400">Address</label>
              <Input
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="mt-1 bg-gray-950 border-gray-700 text-white"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="text-xs text-gray-400">Phone</label>
              <Input
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="mt-1 bg-gray-950 border-gray-700 text-white"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-xs text-gray-400">Email</label>
              <Input
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 bg-gray-950 border-gray-700 text-white"
              />
            </div>

          </div>

          {/* BUTTON */}
          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 min-w-[140px]"
            >
              {loading ? (
                <LoaderCircle className="animate-spin h-4 w-4" />
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default PersonalDetails;