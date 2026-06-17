import { FaEye, FaEdit, FaTrashAlt, FaSpinner } from "react-icons/fa";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteThisResume } from "@/Services/resumeAPI";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const gradients = [
  "from-indigo-500 via-purple-500 to-pink-500",
  "from-green-400 via-blue-500 to-purple-600",
  "from-red-400 via-yellow-500 to-green-500",
  "from-blue-500 via-teal-400 to-green-300",
  "from-pink-500 via-red-500 to-yellow-500",
];

const getRandomGradient = () => {
  return gradients[Math.floor(Math.random() * gradients.length)];
};

function ResumeCard({ resume, refreshData }) {
  const [loading, setLoading] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const navigate = useNavigate();

  const gradient = getRandomGradient();

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteThisResume(resume._id);
      toast.success("Resume deleted successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      setOpenAlert(false);
      refreshData();
    }
  };

  return (
    <div
      className="group relative overflow-hidden rounded-2xl border border-white/10
      bg-white/5 backdrop-blur-xl shadow-xl hover:shadow-2xl hover:scale-[1.03]
      transition-all duration-300"
    >
      {/* Glow background */}
      <div className={`absolute -inset-1 bg-gradient-to-r ${gradient} opacity-10 blur-2xl group-hover:opacity-30 transition`} />

      {/* Top gradient strip */}
      <div className={`h-2 bg-gradient-to-r ${gradient}`} />

      {/* Content */}
      <div className="p-6 flex flex-col justify-between h-[320px] relative z-10">

        {/* Title */}
        <div className="flex-1 flex items-center justify-center">
          <h2
            className={`text-center font-bold text-lg bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}
          >
            {resume.title}
          </h2>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mt-6 rounded-xl p-3
          bg-white/5 border border-white/10 backdrop-blur-md">

          <Button
            variant="ghost"
            onClick={() => navigate(`/dashboard/view-resume/${resume._id}`)}
            className="hover:bg-blue-500/10 rounded-full text-gray-300 hover:text-blue-400"
          >
            <FaEye className="text-lg" />
          </Button>

          <Button
            variant="ghost"
            onClick={() => navigate(`/dashboard/edit-resume/${resume._id}`)}
            className="hover:bg-purple-500/10 rounded-full text-gray-300 hover:text-purple-400"
          >
            <FaEdit className="text-lg" />
          </Button>

          <Button
            variant="ghost"
            onClick={() => setOpenAlert(true)}
            className="hover:bg-red-500/10 rounded-full text-gray-300 hover:text-red-400"
          >
            <FaTrashAlt className="text-lg" />
          </Button>
        </div>
      </div>

      {/* Alert Dialog */}
      <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
        <AlertDialogContent className="rounded-2xl bg-[#0b1220] border border-white/10 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">
              Delete Resume?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              This action is permanent and cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10">
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={handleDelete}
              disabled={loading}
              className="bg-red-500 hover:bg-red-600 rounded-full"
            >
              {loading ? (
                <FaSpinner className="animate-spin" />
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default ResumeCard;