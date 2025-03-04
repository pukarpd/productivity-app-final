/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Help() {
  const [isDark, setIsDark] = useState(() => localStorage.getItem("theme") === "dark");

  useEffect(() => {
    const handleStorageChange = () => {
      setIsDark(localStorage.getItem("theme") === "dark");
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <main className={`min-h-screen flex flex-col items-center py-12 px-4 transition-colors duration-300 ${
      isDark ? "bg-gray-900 text-white" : "bg-blue-50 text-black"
    }`}>
      <h1 className="text-4xl font-bold mb-6">📖 Help & Documentation</h1>

      <div className={`max-w-2xl p-6 rounded-lg shadow-lg ${
        isDark ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}>
        <h2 className="text-2xl font-semibold">How to Use the To-Do List</h2>
        <ul className="mt-4 space-y-2">
          <li>✅ <strong>Enter a task</strong> in the input box and press the <strong>+ button</strong> to add it.</li>
          <li>✅ <strong>Add sub-tasks</strong> by entering multiple lines in the sub-task input.</li>
          <li>✅ <strong>Set a due date</strong> using the date picker.</li>
          <li>✅ <strong>Sort tasks</strong> by due date or default order.</li>
          <li>✅ <strong>Mark tasks as complete</strong> by clicking the ✅ check icon.</li>
          <li>✅ <strong>Delete tasks</strong> using the 🗑️ trash button.</li>
          <li>✅ <strong>Clear completed tasks</strong> with the red "Clear Completed" button.</li>
          <li>✅ <strong>Toggle Dark/Light Mode</strong> using the 🌙/☀️ switch.</li>
        </ul>
      </div>

      <Link href="/">
        <button className={`mt-6 px-6 py-3 rounded-lg text-lg font-semibold flex items-center gap-2 transition ${
          isDark ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-blue-400 hover:bg-blue-500 text-black"
        }`}>
          🔙 <span>Back to Home</span>
        </button>
      </Link>
    </main>
  );
}
