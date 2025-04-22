"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ProgressBarProps {
  completed: number;
  total: number;
  isDark: boolean;
}

export default function ProgressBar({ completed, total, isDark }: ProgressBarProps) {
  const [progress, setProgress] = useState(0);
  
  // Calculate percentage and animate the progress
  useEffect(() => {
    const percentage = total > 0 ? (completed / total) * 100 : 0;
    setProgress(percentage);
  }, [completed, total]);

  return (
    <div className="flex flex-col items-center w-24">
      {/* Progress Bar Container */}
      <div className={`w-2 h-48 rounded-full overflow-hidden ${isDark ? "bg-gray-700" : "bg-blue-200"}`}>
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: `${progress}%` }}
          transition={{ duration: 0.5 }}
          className={`w-full ${isDark ? "bg-blue-500" : "bg-blue-600"}`}
        />
      </div>
      
      {/* Stats Display */}
      <div className={`mt-2 text-center ${isDark ? "text-gray-300" : "text-blue-900"}`}>
        <div className="text-sm font-medium">{completed}/{total}</div>
        <div className="text-xs">Tasks</div>
      </div>
    </div>
  );
} 