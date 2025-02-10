// Main page that combines all components
"use client";

import { motion } from "framer-motion";
import { useTodoStore } from "@/app/useTodoStore";
import TodoInput from "@/components/TodoInput";
import TodoList from "@/components/TodoList";

export default function Home() {
  // Get todos and actions from Zustand store
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodoStore();

  return (
    <main className="min-h-screen bg-gray-900 flex flex-col items-center py-12 px-4">
      {/* Animated heading */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-white mb-6"
      >
        📝 My To-Do List
      </motion.h1>

      {/* Task input field */}
      <TodoInput addTodo={addTodo} />

      {/* Task list display */}
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </main>
  );
}
