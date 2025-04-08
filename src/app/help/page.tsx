"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Help() {
  const [isDark, setIsDark] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme") === "dark";
      setIsDark(storedTheme);
    }
  }, []);

  return (
    <main className={`min-h-screen flex flex-col items-center py-12 px-4 transition-colors duration-300 ${
      isDark ? "bg-gray-900 text-white" : "bg-blue-50 text-black"
    }`}>
      <h1 className="text-4xl font-bold mb-2">📖 Help & Documentation</h1>
      <p className="text-lg mb-6 text-center">This guide walks you through everything you can do with the To-Do List.</p>

      <div className={`max-w-2xl p-6 rounded-lg shadow-lg ${
        isDark ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}>
        <h2 className="text-2xl font-semibold mb-4">How to Use the To-Do List</h2>
        <ul className="space-y-3 list-none">
          <li>✅ <strong>Enter a task:</strong> Type in the task box and press the <strong>+ button</strong>.</li>
          <li>✅ <strong>Add sub-tasks:</strong> Enter multiple lines in the sub-task input field.</li>
          <li>✅ <strong>Set a due date:</strong> Use the calendar date picker to select a deadline.</li>
          <li>✅ <strong>Sort tasks:</strong> Choose between due date or default order from the dropdown.</li>
          <li>✅ <strong>Mark as complete:</strong> Click the ✅ check icon to mark a task done.</li>
          <li>✅ <strong>Delete tasks:</strong> Use the 🗑️ trash button to remove a task.</li>
          <li>✅ <strong>Clear completed tasks:</strong> Hit the red <strong>Clear Completed</strong> button.</li>
          <li>✅ <strong>Toggle theme:</strong> Switch between 🌙 dark and ☀️ light modes.</li>
        </ul>
      </div>

      <Link href="/">
      <button
  className={`mt-8 px-12 py-5 rounded-2xl text-2xl font-bold flex items-center gap-4 transition ${
    isDark
      ? "bg-blue-500 hover:bg-blue-600 text-white"
      : "bg-blue-400 hover:bg-blue-500 text-black"
  }`}
>
  🔙 <span>Back to Home</span>
</button>

      </Link>
    </main>
  );
}
