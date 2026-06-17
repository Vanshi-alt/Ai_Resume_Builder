import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LoaderCircle } from "lucide-react";
import { useDispatch } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { updateThisResume } from "@/Services/resumeAPI";

const formFields = {
  universityName: "",
  degree: "",
  major: "",
  grade: "",
  gradeType: "CGPA",
  startDate: "",
  endDate: "",
  description: "",
};

function Education({ resumeInfo }) {
  const [educationalList, setEducationalList] = React.useState(
    resumeInfo?.education || [{ ...formFields }]
  );

  const { resume_id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    dispatch(addResumeData({ ...resumeInfo, education: educationalList }));
  }, [educationalList]);

  const AddNewEducation = () => {
    setEducationalList([...educationalList, { ...formFields }]);
  };

  const RemoveEducation = () => {
    setEducationalList((prev) => prev.slice(0, -1));
  };

  const onSave = () => {
    if (educationalList.length === 0) {
      return toast("Please add atleast one education");
    }

    setLoading(true);

    const data = {
      data: {
        education: educationalList,
      },
    };

    if (resume_id) {
      updateThisResume(resume_id, data)
        .then(() => toast("Resume Updated"))
        .catch((error) => toast(error.message))
        .finally(() => setLoading(false));
    }
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...educationalList];

    list[index] = {
      ...list[index],
      [name]: value,
    };

    setEducationalList(list);
  };

  return (
    <div className="mt-10 rounded-xl border border-gray-800 bg-gray-900 shadow-xl text-white">

      {/* HEADER */}
      <div className="p-5 border-b border-gray-800 bg-gray-800 rounded-t-xl">
        <h2 className="text-xl font-bold">🎓 Education</h2>
        <p className="text-sm text-gray-400">
          Add your academic background and qualifications
        </p>
      </div>

      {/* FORM LIST */}
      <div className="p-5 space-y-6">
        {educationalList.map((item, index) => (
          <div
            key={index}
            className="rounded-xl border border-gray-800 bg-gray-950 p-5 shadow-md hover:border-gray-700 transition"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* University */}
              <div className="md:col-span-2">
                <label className="text-xs text-gray-400">
                  University Name
                </label>
                <Input
                  name="universityName"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.universityName}
                  className="mt-1 bg-gray-900 border-gray-700 text-white"
                />
              </div>

              {/* Degree */}
              <div>
                <label className="text-xs text-gray-400">Degree</label>
                <Input
                  name="degree"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.degree}
                  className="mt-1 bg-gray-900 border-gray-700 text-white"
                />
              </div>

              {/* Major */}
              <div>
                <label className="text-xs text-gray-400">Major</label>
                <Input
                  name="major"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.major}
                  className="mt-1 bg-gray-900 border-gray-700 text-white"
                />
              </div>

              {/* Start Date */}
              <div>
                <label className="text-xs text-gray-400">Start Date</label>
                <Input
                  type="date"
                  name="startDate"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.startDate}
                  className="mt-1 bg-gray-900 border-gray-700 text-white"
                />
              </div>

              {/* End Date */}
              <div>
                <label className="text-xs text-gray-400">End Date</label>
                <Input
                  type="date"
                  name="endDate"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.endDate}
                  className="mt-1 bg-gray-900 border-gray-700 text-white"
                />
              </div>

              {/* Grade */}
              <div className="md:col-span-2">
                <label className="text-xs text-gray-400">Grade</label>

                <div className="flex gap-3 mt-1">
                  <select
                    name="gradeType"
                    value={item?.gradeType}
                    onChange={(e) => handleChange(e, index)}
                    className="bg-gray-900 border border-gray-700 text-white rounded-md px-3 py-2 text-sm"
                  >
                    <option value="CGPA">CGPA</option>
                    <option value="GPA">GPA</option>
                    <option value="Percentage">Percentage</option>
                  </select>

                  <Input
                    type="text"
                    name="grade"
                    onChange={(e) => handleChange(e, index)}
                    defaultValue={item?.grade}
                    className="bg-gray-900 border-gray-700 text-white"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="text-xs text-gray-400">Description</label>
                <Textarea
                  name="description"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.description}
                  className="mt-1 bg-gray-900 border-gray-700 text-white"
                />
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div className="flex flex-col md:flex-row justify-between gap-3 p-5 border-t border-gray-800 bg-gray-900 rounded-b-xl">

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={AddNewEducation}
            className="border-gray-700 text-white bg-gray-800 hover:bg-gray-700"
          >
            + Add Education
          </Button>

          <Button
            variant="outline"
            onClick={RemoveEducation}
            className="border-gray-700 text-white bg-gray-800 hover:bg-gray-700"
          >
            - Remove
          </Button>
        </div>

        <Button
          onClick={onSave}
          disabled={loading}
          className="min-w-[120px] bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          {loading ? (
            <LoaderCircle className="animate-spin h-4 w-4" />
          ) : (
            "Save Changes"
          )}
        </Button>
      </div>
    </div>
  );
}

export default Education;