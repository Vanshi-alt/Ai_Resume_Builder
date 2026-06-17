import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoaderCircle, Trash2 } from "lucide-react";
import RichTextEditor from "@/components/custom/RichTextEditor";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { useParams } from "react-router-dom";
import { updateThisResume } from "@/Services/resumeAPI";
import { toast } from "sonner";

const formFields = {
  title: "",
  companyName: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  currentlyWorking: "",
  workSummary: "",
};

function Experience({ resumeInfo, setEnabledNext, setEnabledPrev }) {
  const [experienceList, setExperienceList] = React.useState(
    resumeInfo?.experience || []
  );
  const [loading, setLoading] = React.useState(false);
  const { resume_id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      dispatch(addResumeData({ ...resumeInfo, experience: experienceList }));
    } catch (error) {
      console.log("error in experience context update", error.message);
    }
  }, [experienceList]);

  const addExperience = () => {
    if (!experienceList) {
      setExperienceList([formFields]);
      return;
    }
    setExperienceList([...experienceList, formFields]);
  };

  const removeExperience = (index) => {
    const newList = experienceList.filter((_, i) => i !== index);
    setExperienceList(newList);
  };

  const handleChange = (e, index) => {
    setEnabledNext(false);
    setEnabledPrev(false);

    const { name, value } = e.target;
    const list = [...experienceList];

    list[index] = {
      ...list[index],
      [name]: value,
    };

    setExperienceList(list);
  };

  const handleRichTextEditor = (value, name, index) => {
    const list = [...experienceList];

    list[index] = {
      ...list[index],
      [name]: value,
    };

    setExperienceList(list);
  };

  const onSave = () => {
    setLoading(true);

    const data = {
      data: {
        experience: experienceList,
      },
    };

    if (resume_id) {
      updateThisResume(resume_id, data)
        .then(() => toast.success("Resume Updated"))
        .catch((error) => toast.error(error.message))
        .finally(() => {
          setEnabledNext(true);
          setEnabledPrev(true);
          setLoading(false);
        });
    }
  };

  return (
    <div className="mt-10 p-6 bg-gray-900 text-white rounded-2xl shadow-xl border border-gray-800">

      {/* HEADER */}
      <div className="mb-4">
        <h2 className="text-xl font-bold">💼 Experience</h2>
        <p className="text-sm text-gray-400">
          Add your work experience details
        </p>
      </div>

      {/* EXPERIENCE LIST */}
      <div className="space-y-6">
        {experienceList?.map((exp, index) => (
          <div
            key={index}
            className="p-5 bg-gray-950 rounded-xl border border-gray-800 hover:border-gray-700 transition"
          >
            {/* TOP BAR */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-300">
                Experience {index + 1}
              </h3>

              <Button
                variant="outline"
                className="bg-gray-800 border-gray-700 text-red-400 hover:bg-red-500/10"
                onClick={() => removeExperience(index)}
              >
                <Trash2 size={18} />
              </Button>
            </div>

            {/* INPUT GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <Input
                name="title"
                placeholder="Position"
                value={exp?.title}
                onChange={(e) => handleChange(e, index)}
                className="bg-gray-900 border-gray-700 text-white"
              />

              <Input
                name="companyName"
                placeholder="Company"
                value={exp?.companyName}
                onChange={(e) => handleChange(e, index)}
                className="bg-gray-900 border-gray-700 text-white"
              />

              <Input
                name="city"
                placeholder="City"
                value={exp?.city}
                onChange={(e) => handleChange(e, index)}
                className="bg-gray-900 border-gray-700 text-white"
              />

              <Input
                name="state"
                placeholder="State"
                value={exp?.state}
                onChange={(e) => handleChange(e, index)}
                className="bg-gray-900 border-gray-700 text-white"
              />

              <Input
                type="date"
                name="startDate"
                value={exp?.startDate}
                onChange={(e) => handleChange(e, index)}
                className="bg-gray-900 border-gray-700 text-white"
              />

              <Input
                type="date"
                name="endDate"
                value={exp?.endDate}
                onChange={(e) => handleChange(e, index)}
                className="bg-gray-900 border-gray-700 text-white"
              />
            </div>

            {/* RICH TEXT */}
            <div className="mt-4">
              <RichTextEditor
                index={index}
                defaultValue={exp?.workSummary}
                onRichTextEditorChange={(val) =>
                  handleRichTextEditor(val, "workSummary", index)
                }
                resumeInfo={resumeInfo}
              />
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER BUTTONS */}
      <div className="flex justify-between mt-6">
        <Button
          onClick={addExperience}
          variant="outline"
          className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
        >
          + Add Experience
        </Button>

        <Button
          onClick={onSave}
          className="bg-indigo-600 hover:bg-indigo-700 text-white min-w-[120px]"
        >
          {loading ? (
            <LoaderCircle className="animate-spin h-4 w-4" />
          ) : (
            "Save"
          )}
        </Button>
      </div>
    </div>
  );
}

export default Experience;