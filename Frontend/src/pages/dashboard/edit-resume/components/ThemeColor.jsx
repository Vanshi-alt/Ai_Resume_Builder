import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Palette } from "lucide-react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { updateThisResume } from "@/Services/resumeAPI";

function ThemeColor({ resumeInfo }) {
  const dispatch = useDispatch();
  const { resume_id } = useParams();
  const [selectedColor, setSelectedColor] = useState(resumeInfo?.themeColor);

  const colors = [
    "#6366F1", "#8B5CF6", "#EC4899", "#EF4444", "#F59E0B",
    "#10B981", "#06B6D4", "#3B82F6", "#14B8A6", "#84CC16",
    "#F97316", "#A855F7", "#0EA5E9", "#22C55E", "#E11D48",
  ];

  const onColorSelect = async (color) => {
    setSelectedColor(color);

    dispatch(
      addResumeData({
        ...resumeInfo,
        themeColor: color,
      })
    );

    try {
      await updateThisResume(resume_id, {
        data: { themeColor: color },
      });

      toast.success("Theme updated");
    } catch (error) {
      toast.error("Failed to update theme");
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 rounded-full bg-gray-900 border-gray-700 text-white hover:bg-gray-800 hover:border-gray-600 transition"
        >
          <Palette className="w-4 h-4" />
          Theme
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-72 p-4 rounded-xl bg-gray-900 border border-gray-800 text-white shadow-xl">

        {/* HEADER */}
        <div className="mb-4">
          <h2 className="text-sm font-semibold text-white">
            Choose Theme Color
          </h2>
          <p className="text-xs text-gray-400">
            Personalize your resume look
          </p>
        </div>

        {/* COLORS GRID */}
        <div className="grid grid-cols-5 gap-3">
          {colors.map((color, index) => (
            <button
              key={index}
              onClick={() => onColorSelect(color)}
              className={`h-8 w-8 rounded-full transition-all duration-200 border
                hover:scale-110 hover:shadow-lg
                ${
                  selectedColor === color
                    ? "ring-2 ring-white scale-110"
                    : "border-gray-700"
                }
              `}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>

      </PopoverContent>
    </Popover>
  );
}

export default ThemeColor;