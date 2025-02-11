"use client";

import { motion } from "framer-motion";
import { useTodoStore } from "@/app/useTodoStore";
import TodoInput from "@/components/TodoInput";
import TodoList from "@/components/TodoList";
import { useState } from "react";

export default function Home() {
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodoStore();
  const [isDark, setIsDark] = useState(true);

  return (
    <main className={`min-h-screen flex flex-col items-center py-12 px-4 transition-colors duration-300 ${
      isDark ? "bg-gray-900" : "bg-blue-50"
    }`}>
      <div className="w-full max-w-md flex justify-between items-center mb-6">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-4xl font-bold ${isDark ? "text-white" : "text-blue-900"}`}
        >
          📝To-Do List by BOCA gang
        </motion.h1>
        
        <div className="flex items-center gap-2">
          <span className={`text-sm ${isDark ? "text-gray-400" : "text-blue-700"}`}>🌙</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={!isDark}
              onChange={() => setIsDark(!isDark)}
              className="sr-only"
            />
            <div className={`w-14 h-7 rounded-full transition ${
              isDark ? "bg-gray-700" : "bg-blue-500"
            }`}>
              <div className={`absolute top-1 left-1 bg-white w-5 h-5 rounded-full transition-transform ${
                isDark ? "" : "translate-x-7"
              }`}></div>
            </div>
          </label>
          <span className={`text-sm ${isDark ? "text-gray-400" : "text-blue-700"}`}>☀️</span>
        </div>
      </div>

      <TodoInput isDark={isDark} addTodo={addTodo} />
      <TodoList isDark={isDark} todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </main>
  );
}