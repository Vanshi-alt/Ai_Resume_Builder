import React, { useState } from "react";
import { CopyPlus, Loader, FilePlus2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createNewResume } from "@/Services/resumeAPI";
import { useNavigate } from "react-router-dom";

function AddResume() {
  const [isDialogOpen, setOpenDialog] = useState(false);
  const [resumetitle, setResumetitle] = useState("");
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();

  const createResume = async () => {
    setLoading(true);
    if (resumetitle === "") return console.log("Please add a title");

    const data = {
      data: {
        title: resumetitle,
        themeColor: "#6366F1",
      },
    };

    createNewResume(data)
      .then((res) => {
        Navigate(`/dashboard/edit-resume/${res.data.resume._id}`);
      })
      .finally(() => {
        setLoading(false);
        setResumetitle("");
      });
  };

  return (
    <>
      {/* CARD */}
      <div
        onClick={() => setOpenDialog(true)}
        className="group relative flex items-center justify-center h-[380px] rounded-2xl
        border border-white/10 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl
        shadow-xl hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 cursor-pointer overflow-hidden"
      >
        {/* glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition" />

        {/* animated border glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-500 opacity-10 blur-2xl group-hover:opacity-30 transition" />

        <div className="flex flex-col items-center gap-3 z-10">
          <div className="p-5 rounded-full bg-white/10 border border-white/20 shadow-lg group-hover:scale-110 transition">
            <CopyPlus className="text-purple-300 w-8 h-8" />
          </div>

          <p className="text-sm text-gray-300 font-medium">
            Create New Resume
          </p>
        </div>
      </div>

      {/* DIALOG */}
      <Dialog open={isDialogOpen}>
        <DialogContent
          setOpenDialog={setOpenDialog}
          className="rounded-2xl bg-[#0b1220] border border-white/10 text-white"
        >
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white">
              ✨ Create New Resume
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Give your resume a meaningful title to get started.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 space-y-4">
            <Input
              className="h-11 rounded-xl bg-white/5 border-white/10 text-white placeholder:text-gray-500"
              type="text"
              placeholder="e.g. Backend Developer Resume"
              value={resumetitle}
              onChange={(e) => setResumetitle(e.target.value.trimStart())}
            />

            <div className="flex justify-end gap-3">
              <Button
                variant="ghost"
                onClick={() => setOpenDialog(false)}
                className="rounded-xl text-gray-300 hover:text-white"
              >
                Cancel
              </Button>

              <Button
                onClick={createResume}
                disabled={!resumetitle || loading}
                className="rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:opacity-90"
              >
                {loading ? (
                  <Loader className="animate-spin w-4 h-4" />
                ) : (
                  <>
                    <FilePlus2 className="w-4 h-4 mr-2" />
                    Create
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddResume;