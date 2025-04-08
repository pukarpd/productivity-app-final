"use client";

import { motion } from "framer-motion";
import { CheckCircle, Settings, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useTodoStore } from "@/app/useTodoStore";

interface SubTask {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoItemProps {
  todo: {
    id: number;
    text: string;
    description?: string;
    completed: boolean;
    dueDate?: string;
    subTasks?: SubTask[];
  };
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  isPriority?: boolean;
}

export default function TodoItem({ todo, toggleTodo, deleteTodo, isPriority }: TodoItemProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const { toggleSubTask } = useTodoStore();
  const [isDark, setIsDark] = useState(() => localStorage.getItem("theme") === "dark");

  useEffect(() => {
    const handleStorageChange = () => {
      setIsDark(localStorage.getItem("theme") === "dark");
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleGearClick = () => {
    setIsSpinning(true);
    setTimeout(() => setIsSpinning(false), 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`p-4 mb-2 rounded-lg border transition-all ${
        isPriority
          ? isDark
            ? "bg-yellow-900 border-yellow-600"
            : "bg-yellow-100 border-yellow-400"
          : isDark
          ? "bg-gray-800 border-gray-700"
          : "bg-blue-100 border-blue-200"
      }`}
    >
      {/* Main Todo Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-1">
          <button
            onClick={() => toggleTodo(todo.id)}
            className="mr-2 hover:opacity-80 transition-opacity"
          >
            <CheckCircle
              className={`w-6 h-6 ${
                todo.completed
                  ? "text-green-500 stroke-2"
                  : `${isDark ? "text-gray-400" : "text-blue-600"} stroke-1`
              }`}
              strokeWidth={todo.completed ? 2.5 : 1.5}
            />
          </button>

          {/* Task Text, Description and Due Date */}
          <div className="flex flex-col flex-1">
            <span
              className={`block font-medium ${
                todo.completed
                  ? "line-through text-gray-400"
                  : isDark
                  ? "text-white"
                  : "text-blue-900"
              }`}
            >
              {todo.text}
            </span>

            {todo.description && (
              <span className={`text-sm mt-1 ${isDark ? "text-gray-400" : "text-blue-700"}`}>
                {todo.description}
              </span>
            )}

            {todo.dueDate && (
              <span className={`text-xs mt-1 ${isDark ? "text-gray-400" : "text-blue-700"}`}>
                Due: {new Date(todo.dueDate).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 ml-2">
          <div className="flex items-center gap-1">
            <button
              className={`p-1 rounded-full hover:opacity-80 transition-opacity ${
                isDark ? "hover:bg-gray-700" : "hover:bg-blue-200"
              }`}
              onClick={handleGearClick}
            >
              <Settings
                className={`w-5 h-5 ${isSpinning ? "animate-spin" : ""} ${
                  isDark ? "text-orange-400" : "text-orange-500"
                }`}
              />
            </button>
            {isSpinning && (
              <span className={`text-xs ${isDark ? "text-gray-400" : "text-blue-700"}`}>
                In progress...
              </span>
            )}
          </div>
          <button
            onClick={() => deleteTodo(todo.id)}
            className={`p-1 rounded-full hover:opacity-80 transition-opacity ${
              isDark ? "hover:bg-gray-700" : "hover:bg-blue-200"
            }`}
          >
            <Trash2 className={`w-5 h-5 ${isDark ? "text-red-400" : "text-red-500"}`} />
          </button>
        </div>
      </div>

      {/* Sub-Tasks List */}
      {todo.subTasks && todo.subTasks.length > 0 && (
        <ul className="ml-8 mt-2 space-y-2">
          {todo.subTasks.map((subTask) => (
            <motion.li
              key={subTask.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center"
            >
              <button
                onClick={() => toggleSubTask(todo.id, subTask.id)}
                className="mr-2 hover:opacity-80 transition-opacity"
              >
                <CheckCircle
                  className={`w-5 h-5 ${
                    subTask.completed
                      ? "text-green-500 stroke-2"
                      : `${isDark ? "text-gray-400" : "text-blue-600"} stroke-1`
                  }`}
                  strokeWidth={subTask.completed ? 2.5 : 1.5}
                />
              </button>
              <span
                className={`text-sm ${
                  subTask.completed
                    ? "line-through text-gray-400"
                    : isDark
                    ? "text-white"
                    : "text-blue-900"
                }`}
              >
                {subTask.text}
              </span>
            </motion.li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}
