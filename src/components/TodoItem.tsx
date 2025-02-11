"use client";

import { motion } from "framer-motion";
import { CheckCircle, Settings, Trash2 } from "lucide-react";
import { useState } from "react";

interface TodoItemProps {
  todo: {
    id: number;
    text: string;
    completed: boolean;
    dueDate?: string;
  };
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  isDark: boolean;
}

export default function TodoItem({ todo, toggleTodo, deleteTodo, isDark }: TodoItemProps) {
  const [isSpinning, setIsSpinning] = useState(false);

  const handleGearClick = () => {
    setIsSpinning(true);
    setTimeout(() => setIsSpinning(false), 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`flex items-center justify-between p-4 mb-2 rounded-lg ${
        isDark ? "bg-gray-800" : "bg-blue-100"
      }`}
    >
      <div className="flex items-center flex-1">
        <button
          onClick={() => toggleTodo(todo.id)}
          className="mr-2 hover:opacity-80 transition-opacity"
        >
          <CheckCircle
            className={`w-6 h-6 ${
              todo.completed 
                ? 'text-green-500 stroke-2' 
                : `${isDark ? 'text-gray-400' : 'text-blue-600'} stroke-1`
            }`}
            strokeWidth={todo.completed ? 2.5 : 1.5}
          />
        </button>
        
        <div className="flex flex-col flex-1">
          <span className={`${
            todo.completed 
              ? "line-through text-gray-400" 
              : isDark 
                ? "text-white" 
                : "text-blue-900"
          }`}>
            {todo.text}
          </span>
          {todo.dueDate && (
            <span className={`text-xs mt-1 ${
              isDark ? "text-gray-400" : "text-blue-700"
            }`}>
              Due: {new Date(todo.dueDate).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>
      
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
    </motion.div>
  );
}