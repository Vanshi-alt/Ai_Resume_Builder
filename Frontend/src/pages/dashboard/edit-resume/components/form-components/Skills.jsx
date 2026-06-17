import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useDispatch } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { useParams } from "react-router-dom";
import { updateThisResume } from "@/Services/resumeAPI";
import { toast } from "sonner";

function Skills({ resumeInfo }) {
  const dispatch = useDispatch();
  const { resume_id } = useParams();

  const [skillsList, setSkillsList] = useState([
    { name: "", rating: 0 },
  ]);

  const [loading, setLoading] = useState(false);

  // ✅ load once from resume
  useEffect(() => {
    if (resumeInfo?.skills?.length) {
      setSkillsList(resumeInfo.skills);
    }
  }, [resumeInfo]);

  const handleChange = (index, key, value) => {
    const updated = [...skillsList];
    updated[index] = {
      ...updated[index],
      [key]: value,
    };
    setSkillsList(updated);
  };

  const addSkill = () => {
    setSkillsList([...skillsList, { name: "", rating: 0 }]);
  };

  const removeSkill = () => {
    if (skillsList.length === 1) return;
    setSkillsList(skillsList.slice(0, -1));
  };

  const onSave = async () => {
    setLoading(true);

    try {
      await updateThisResume(resume_id, {
        data: { skills: skillsList },
      });

      dispatch(
        addResumeData({
          ...resumeInfo,
          skills: skillsList,
        })
      );

      toast.success("Skills Updated");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10 p-6 rounded-2xl border border-gray-800 bg-gray-900 text-white shadow-xl">

      {/* HEADER */}
      <h2 className="text-xl font-bold">⚡ Skills</h2>
      <div className="w-full border-b border-gray-700 mt-2 mb-5"></div>
      <p className="text-sm text-gray-400 mb-5">
        Add your technical and professional skills
      </p>

      {/* SKILLS LIST */}
      <div className="space-y-4">
        {skillsList.map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row md:items-center gap-4"
          >

            {/* NAME */}
            <Input
              value={item.name}
              placeholder="Skill name (e.g. React.js)"
              onChange={(e) =>
                handleChange(index, "name", e.target.value)
              }
              className="bg-gray-950 border-gray-700 text-white placeholder:text-gray-500"
            />

            {/* RATING */}
            <div className="flex items-center gap-3">
              <Rating
                style={{ maxWidth: 140 }}
                value={item.rating}
                onChange={(v) =>
                  handleChange(index, "rating", v)
                }
              />

              <span className="text-xs text-gray-400">
                {item.rating}/5
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* BUTTONS */}
      <div className="flex flex-wrap gap-3 mt-6">

        <Button onClick={addSkill} className="bg-indigo-600 hover:bg-indigo-700">
          + Add Skill
        </Button>

        <Button onClick={removeSkill} variant="outline" className="border-gray-600 text-white">
          Remove
        </Button>

        <Button
          onClick={onSave}
          disabled={loading}
          className="bg-green-600 hover:bg-green-700"
        >
          {loading ? "Saving..." : "Save Skills"}
        </Button>

      </div>
    </div>
  );
}

export default Skills;