/* eslint-disable react/no-unescaped-entities */
"use client";


import { motion } from "framer-motion";
import { useTodoStore } from "@/app/useTodoStore";
import TodoInput from "@/components/TodoInput";
import TodoList from "@/components/TodoList";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodoStore();

  // Fix: Avoid accessing localStorage before component mounts
  const [isDark, setIsDark] = useState<boolean | null>(null);
  const [key, setKey] = useState(0); // Force re-render key

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") === "dark";
    setIsDark(storedTheme);
  }, []);

  if (isDark === null) {
    return null; // Prevent rendering until the theme is determined
  }

  return (
    <main
      key={key} // This forces a re-render when key changes
      className={`min-h-screen flex flex-col items-center py-12 px-4 transition-colors duration-300 ${
        isDark ? "bg-gray-900" : "bg-blue-50"
      }`}
    >
      {/* Title, Theme Toggle & Help Button */}
      <div className="w-full max-w-md flex justify-between items-center mb-4">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-4xl font-bold ${isDark ? "text-white" : "text-blue-900"}`}
        >
          📝 To-Do List by BOCA gang
        </motion.h1>

        {/* Theme Toggle */}
        <div className="flex items-center gap-2">
          <span className={`text-sm ${isDark ? "text-gray-400" : "text-blue-700"}`}>🌙</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={!isDark}
              onChange={() => {
                const newTheme = !isDark;
                setIsDark(newTheme);
                localStorage.setItem("theme", newTheme ? "dark" : "light");

                // Force re-render
                setKey((prevKey) => prevKey + 1);
              }}
              className="sr-only"
            />
            <div
              className={`w-14 h-7 rounded-full transition ${
                isDark ? "bg-gray-700" : "bg-blue-500"
              }`}
            >
              <div
                className={`absolute top-1 left-1 bg-white w-5 h-5 rounded-full transition-transform ${
                  isDark ? "" : "translate-x-7"
                }`}
              ></div>
            </div>
          </label>
          <span className={`text-sm ${isDark ? "text-gray-400" : "text-blue-700"}`}>☀️</span>

          {/* Help Button */}
          <Link href="/help">
            <button
              className={`px-2 py-1 rounded-md text-xs font-semibold flex items-center gap-1 transition ${
                isDark ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-gray-200 hover:bg-gray-300 text-black"
              }`}
            >
              ❓ <span>Help</span>
            </button>
          </Link>
        </div>
      </div>

      {/* Todo Input & List */}
      <TodoInput addTodo={addTodo} />
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </main>
  );
}
