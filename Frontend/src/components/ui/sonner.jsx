import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast rounded-2xl border border-slate-700 bg-slate-900/95 text-slate-100 shadow-2xl backdrop-blur-xl px-4 py-3",

          description:
            "group-[.toast]:text-slate-400 text-sm",

          actionButton:
            "group-[.toast]:bg-violet-600 group-[.toast]:text-white rounded-xl px-3 py-2 transition-all hover:scale-105",

          cancelButton:
            "group-[.toast]:bg-slate-800 group-[.toast]:text-slate-300 rounded-xl px-3 py-2 hover:bg-slate-700",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };