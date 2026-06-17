import React, { useState } from "react";
import { Sparkles, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useDispatch } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { generateAI } from "@/Services/AiModel";
import { updateThisResume } from "@/Services/resumeAPI";

function Summary({ resumeInfo, setEnabledNext, setEnabledPrev }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState(resumeInfo?.summary || "");
  const [aiGeneratedSummeryList, setAiGenerateSummeryList] = useState(null);
  const { resume_id } = useParams();

  const handleInputChange = (e) => {
    setEnabledNext(false);
    setEnabledPrev(false);

    setSummary(e.target.value);

    dispatch(
      addResumeData({
        ...resumeInfo,
        summary: e.target.value,
      })
    );
  };

  const setSummery = (val) => {
    setSummary(val);

    dispatch(
      addResumeData({
        ...resumeInfo,
        summary: val,
      })
    );
  };

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);

    const data = { data: { summary } };

    updateThisResume(resume_id, data)
      .then(() => toast.success("Resume Updated"))
      .catch((err) => toast.error(err.message))
      .finally(() => {
        setEnabledNext(true);
        setEnabledPrev(true);
        setLoading(false);
      });
  };

  const GenerateSummeryFromAI = async () => {
    setLoading(true);

    if (!resumeInfo?.jobTitle) {
      toast.error("Please Add Job Title");
      setLoading(false);
      return;
    }

   const prompt = `
Job Title: ${resumeInfo?.jobTitle}

Generate exactly 3 resume summaries.

Return ONLY valid JSON in this exact format:

[
  {
    "experience_level": "Fresher",
    "summary": "text here"
  },
  {
    "experience_level": "Mid-Level",
    "summary": "text here"
  }
]

Do not add explanation. Do not use markdown.
`;
    try {
      const result = await generateAI(prompt);

      const cleaned = result.replace(/```json|```/g, "").trim();

      const jsonString = cleaned.substring(
        cleaned.indexOf("["),
        cleaned.lastIndexOf("]") + 1
      );

    const parsed = JSON.parse(jsonString);

console.log("PARSED AI:", parsed);

setAiGenerateSummeryList(parsed);

      toast.success("Summary Generated");
    } catch (error) {
      toast.error(error.message || "Error generating summary");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10">

      {/* DARK MAIN CARD */}
      <div className="p-6 rounded-2xl border border-gray-800 bg-gray-900 text-white shadow-xl">

        <h2 className="text-xl font-bold">🧠 Professional Summary</h2>
        <p className="text-sm text-gray-400 mb-4">
          Add a strong summary based on your job role
        </p>

        <form onSubmit={onSave}>

          {/* HEADER ROW */}
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm text-gray-300">Summary</label>

            <Button
              type="button"
              variant="outline"
              onClick={GenerateSummeryFromAI}
              className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700 flex gap-2"
            >
              <Sparkles className="h-4 w-4" />
              AI Generate
            </Button>
          </div>

          {/* TEXTAREA */}
          <Textarea
            name="summary"
            className="min-h-[140px] mt-2 bg-gray-950 border-gray-700 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-indigo-500"
            required
            value={summary}
            onChange={handleInputChange}
            placeholder="Write your professional summary..."
          />

          {/* SAVE */}
          <div className="flex justify-end mt-4">
            <Button
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-700 text-white min-w-[140px]"
            >
              {loading ? (
                <LoaderCircle className="animate-spin h-4 w-4" />
              ) : (
                "Save Summary"
              )}
            </Button>
          </div>
        </form>
      </div>

      {/* AI SUGGESTIONS */}
      {aiGeneratedSummeryList && (
        <div className="mt-6">

          <h2 className="text-lg font-bold text-white mb-3">
            ✨ AI Suggested Summaries
          </h2>

          <div className="grid gap-4">
            {aiGeneratedSummeryList.map((item, index) => (
              <div
                key={index}
                onClick={() => {
  console.log("Clicked item:", item);

  setEnabledNext(false);
  setEnabledPrev(false);
  setSummery(item.summary);
}}
                className="p-5 rounded-xl border border-gray-800 bg-gray-900 text-white shadow-md hover:border-gray-600 cursor-pointer transition"
              >
                <h3 className="font-semibold text-indigo-400 mb-1">
                  {item?.experience_level}
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {item?.summary}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Summary;