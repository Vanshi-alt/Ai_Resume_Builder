import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2, LoaderCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import SimpleRichTextEditor from "@/components/custom/SimpeRichTextEditor";
import { useDispatch } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import { updateThisResume } from "@/Services/resumeAPI";

const formFields = {
  projectName: "",
  techStack: "",
  projectSummary: "",
};

function Project({ resumeInfo, setEnabledNext, setEnabledPrev }) {
  const [projectList, setProjectList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { resume_id } = useParams();
  const dispatch = useDispatch();

  // INIT
  useEffect(() => {
    if (resumeInfo?.projects?.length > 0) {
      setProjectList(resumeInfo.projects);
    } else {
      setProjectList([{ ...formFields }]);
    }
  }, [resumeInfo]);

  // SYNC TO REDUX
  useEffect(() => {
    dispatch(
      addResumeData({
        ...resumeInfo,
        projects: projectList,
      })
    );
  }, [projectList, dispatch]);

  const addProject = () => {
    setEnabledNext(false);
    setEnabledPrev(false);
    setProjectList([...projectList, { ...formFields }]);
  };

  const removeProject = (index) => {
    setEnabledNext(false);
    setEnabledPrev(false);

    const updated = projectList.filter((_, i) => i !== index);
    setProjectList(updated.length ? updated : [{ ...formFields }]);
  };

  const handleChange = (e, index) => {
    setEnabledNext(false);
    setEnabledPrev(false);

    const { name, value } = e.target;

    const updated = [...projectList];
    updated[index] = {
      ...updated[index],
      [name]: value,
    };

    setProjectList(updated);
  };

  const handleRichTextEditor = (value, name, index) => {
    setEnabledNext(false);
    setEnabledPrev(false);

    const updated = [...projectList];
    updated[index] = {
      ...updated[index],
      [name]: value,
    };

    setProjectList(updated);
  };

  const onSave = async () => {
    if (!resume_id) return;

    setLoading(true);

    const data = {
      data: {
        projects: projectList,
      },
    };

    try {
      await updateThisResume(resume_id, data);
      toast.success("Projects saved successfully!");
      setEnabledNext(true);
      setEnabledPrev(true);
    } catch (error) {
      toast.error(error.message || "Error updating resume");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10">
      <div className="rounded-2xl border border-gray-800 bg-gray-900 shadow-xl text-white p-6">

        {/* HEADER */}
        <div className="mb-6">
          <h2 className="text-xl font-bold">🚀 Projects</h2>
          <p className="text-sm text-gray-400">
            Add your projects with description
          </p>
        </div>

        {/* PROJECT LIST */}
        <div className="space-y-6">
          {projectList.map((project, index) => (
            <div
              key={index}
              className="rounded-xl border border-gray-800 bg-gray-950 p-5 shadow-md hover:border-gray-700 transition"
            >
              {/* TOP BAR */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-300">
                  Project {index + 1}
                </h3>

                <Button
                  variant="outline"
                  size="sm"
                  className="bg-gray-800 border-gray-700 text-red-400 hover:bg-red-500/10"
                  onClick={() => removeProject(index)}
                >
                  <Trash2 size={16} />
                </Button>
              </div>

              {/* INPUT GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Project Name */}
                <div>
                  <label className="text-xs text-gray-400">
                    Project Name
                  </label>
                  <Input
                    name="projectName"
                    value={project.projectName || ""}
                    onChange={(e) => handleChange(e, index)}
                    placeholder="e.g., E-commerce Website"
                    className="mt-1 bg-gray-900 border-gray-700 text-white"
                  />
                </div>

                {/* Tech Stack */}
                <div>
                  <label className="text-xs text-gray-400">
                    Tech Stack
                  </label>
                  <Input
                    name="techStack"
                    value={project.techStack || ""}
                    onChange={(e) => handleChange(e, index)}
                    placeholder="React, Node.js, MongoDB"
                    className="mt-1 bg-gray-900 border-gray-700 text-white"
                  />
                </div>

                {/* DESCRIPTION */}
                <div className="md:col-span-2">
                  <label className="text-xs text-gray-400">
                    Project Description
                  </label>

                  <div className="mt-1">
                    <SimpleRichTextEditor
                      index={index}
                      value={project.projectSummary || ""}
                      onRichTextEditorChange={(value) =>
                        handleRichTextEditor(value, "projectSummary", index)
                      }
                      resumeInfo={resumeInfo}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div className="flex flex-col sm:flex-row justify-between gap-3 mt-6 pt-4 border-t border-gray-800">

          <Button
            onClick={addProject}
            variant="outline"
            className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
          >
            + Add Project
          </Button>

          <Button
            onClick={onSave}
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white min-w-[140px]"
          >
            {loading ? (
              <LoaderCircle className="animate-spin h-4 w-4" />
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>

      </div>
    </div>
  );
}

export default Project;