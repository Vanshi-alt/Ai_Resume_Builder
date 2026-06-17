import React, { useEffect, useState } from "react";
import {
  BtnBold,
  BtnBulletList,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnStrikeThrough,
  BtnUnderline,
  Editor,
  EditorProvider,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";
import { generateAI } from "@/Services/AiModel";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Sparkles, LoaderCircle } from "lucide-react";

const PROMPT = `Create a JSON object with the following fields:
    "position_Title": A string representing the job title.
    "experience": An array of strings, each representing a bullet point describing relevant experience for the given job title in html format.
For the Job Title "{positionTitle}", create a JSON object with the following fields:
The experience array should contain 5-7 bullet points. Each bullet point should be a concise description of a relevant skill, responsibility, or achievement.`;

function RichTextEditor({ onRichTextEditorChange, index, resumeInfo }) {
  const [value, setValue] = useState(
    resumeInfo?.experience[index]?.workSummary || ""
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    onRichTextEditorChange(value);
  }, [value]);

const GenerateSummaryFromAI = async () => {
  if (!resumeInfo?.experience[index]?.title) {
    toast.error("Please Add Position Title");
    return;
  }

  setLoading(true);

  try {
const aiPrompt = `
For the job title "${resumeInfo?.experience[index]?.title}"

Return ONLY valid JSON.

Do NOT write explanation.
Do NOT write "Here is the JSON".
Do NOT use markdown.
Do NOT use triple backticks.

Format:

{
  "experience": [
    "<li>Bullet 1</li>",
    "<li>Bullet 2</li>",
    "<li>Bullet 3</li>",
    "<li>Bullet 4</li>",
    "<li>Bullet 5</li>"
  ]
}
`;

console.log("SENDING AI:", aiPrompt);

const result = await generateAI(aiPrompt)

    const cleaned = result
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    console.log("RAW:", result);
    console.log("CLEANED:", cleaned);

const jsonString = cleaned.substring(
  cleaned.indexOf("{"),
  cleaned.lastIndexOf("}") + 1
);

console.log("JSON ONLY:", jsonString);

const parsed = JSON.parse(jsonString);
    const aiText = parsed.experience
      ? parsed.experience.join("")
      : parsed.experience_bullets?.join("");

    setValue(aiText);
    onRichTextEditorChange(aiText);

    toast.success("Generated successfully");
  } catch (error) {
    console.log(error);
    toast.error("AI generation failed");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="mt-4 rounded-2xl border border-slate-700 bg-slate-900/60 backdrop-blur-xl shadow-xl p-5 transition-all">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <label className="text-sm font-medium text-slate-300">
            Experience Description
          </label>
          <p className="text-xs text-slate-500 mt-1">
            Add role responsibilities or generate with AI
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={GenerateSummaryFromAI}
          disabled={loading}
          className="flex gap-2 border-violet-500/40 text-violet-300 bg-slate-800 hover:bg-slate-700 rounded-xl px-4 transition-all"
        >
          {loading ? (
            <LoaderCircle className="animate-spin h-4 w-4" />
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              Generate AI
            </>
          )}
        </Button>
      </div>

      {/* Editor */}
      <div className="rounded-xl overflow-hidden border border-slate-700 bg-slate-950">

        <EditorProvider>
          <Editor
            value={value}
onChange={(e) => {
  setValue(e.target.value);
  onRichTextEditorChange(e.target.value);
}}
            containerProps={{
              style: {
                minHeight: "220px",
                background: "#020617",
                color: "#f8fafc",
                padding: "16px",
                border: "none",
              },
            }}
          >
            <Toolbar
              style={{
                background: "#111827",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                padding: "10px",
              }}
            >
              <BtnBold />
              <BtnItalic />
              <BtnUnderline />
              <BtnStrikeThrough />
              <Separator />
              <BtnNumberedList />
              <BtnBulletList />
              <Separator />
              <BtnLink />
            </Toolbar>
          </Editor>
        </EditorProvider>

      </div>
    </div>
  );
}

export default RichTextEditor;