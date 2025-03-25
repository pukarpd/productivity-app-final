import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface NotificationProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

export default function Notification({ message, type, onClose }: NotificationProps) {
  const [isDark, setIsDark] = useState(() => localStorage.getItem("theme") === "dark");
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    // Progress bar animation
    const startTime = Date.now();
    const duration = 3000;
    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const remaining = Math.max(0, 100 * (1 - elapsed / duration));
      
      if (remaining > 0) {
        setProgress(remaining);
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);

    return () => clearTimeout(timer);
  }, [onClose]);

  useEffect(() => {
    const handleStorageChange = () => {
      setIsDark(localStorage.getItem("theme") === "dark");
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg min-w-[300px] ${
          type === "success"
            ? isDark
              ? "bg-green-600 text-white"
              : "bg-green-100 text-green-800"
            : isDark
            ? "bg-red-600 text-white"
            : "bg-red-100 text-red-800"
        }`}
      >
        <div className="flex items-start justify-between gap-2">
          <span className="text-xl">{type === "success" ? "✅" : "❌"}</span>
          <div className="flex-1">
            <p className="text-sm font-medium">{message}</p>
          </div>
          <button
            onClick={onClose}
            className={`p-1 rounded-full hover:bg-black/10 transition-colors`}
          >
            <X size={16} />
          </button>
        </div>

        {/* Progress bar */}
        <div className="mt-2 h-1 w-full bg-black/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: "100%" }}
            animate={{ width: `${progress}%` }}
            className={`h-full ${
              type === "success"
                ? isDark
                  ? "bg-green-400"
                  : "bg-green-300"
                : isDark
                ? "bg-red-400"
                : "bg-red-300"
            }`}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
} 