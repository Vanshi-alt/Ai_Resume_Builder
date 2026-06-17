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


function SimpeRichTextEditor({ index, onRichTextEditorChange, resumeInfo }) {
  const [value, setValue] = useState(
    resumeInfo?.projects[index]?.projectSummary || ""
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    onRichTextEditorChange(value);
  }, [value]);

  const GenerateSummaryFromAI = async () => {
    if (
      !resumeInfo?.projects[index]?.projectName ||
      !resumeInfo?.projects[index]?.techStack
    ) {
      toast("Add Project Name and Tech Stack to generate summary");
      return;
    }
    setLoading(true);

const PROMPT = `
You are a strict resume builder AI.

Return ONLY valid JSON.

ABSOLUTE RULES:
- projectSummary MUST contain ONLY 5 to 6 bullet points
- Never exceed 4 items
- Each bullet must be one line and ATS friendly
- No explanations, no markdown, no extra text

Format exactly:

{
  "projectName": "string",
  "projectSummary": [
    "<li>Point 1</li>",
    "<li>Point 2</li>",
    "<li>Point 3</li>",
    "<li>Point 4</li>"
  ]
}

Project Name: ${resumeInfo?.projects[index]?.projectName}
Tech Stack: ${resumeInfo?.projects[index]?.techStack}
`;
    console.log("Prompt", PROMPT);
 const result = await generateAI(PROMPT);

console.log(result);

// extract ONLY first json code block
let cleaned = result
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

const jsonStart = cleaned.indexOf("{");
const jsonEnd = cleaned.lastIndexOf("}") + 1;

cleaned = cleaned.slice(jsonStart, jsonEnd);

const parsed = JSON.parse(cleaned);

const html = parsed.projectSummary.join("");
setValue("");
setTimeout(() => setValue(html), 0);
toast("Generated successfully");
  };

  return (
    <div>
      <div className="flex justify-between my-2">
        <label className="text-xs">Summery</label>
        <Button
          variant="outline"
          size="sm"
          onClick={GenerateSummaryFromAI}
          disabled={loading}
          className="flex gap-2 border-primary text-primary"
        >
          {loading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <>
              <Sparkles className="h-4 w-4" /> Generate from AI
            </>
          )}
        </Button>
      </div>
      <EditorProvider>
        <Editor
          value={value}
          onChange={(e) => {
  const newValue = e.target.value;
  setValue(newValue);
  onRichTextEditorChange(newValue);
}}
        >
          <Toolbar>
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
  );
}

export default SimpeRichTextEditor;
