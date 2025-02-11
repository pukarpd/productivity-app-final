import { useState } from "react";
import { Plus } from "lucide-react";

interface TodoInputProps {
  addTodo: (todo: { text: string; dueDate?: string }) => void;
  isDark: boolean;
}

export default function TodoInput({ addTodo, isDark }: TodoInputProps) {
  const [task, setTask] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleAdd = () => {
    if (task.trim()) {
      addTodo({ 
        text: task.trim(), 
        dueDate: dueDate || undefined 
      });
      setTask("");
      setDueDate("");
    }
  };

  return (
    <div className="flex flex-col w-full max-w-md gap-2">
      <div className="flex w-full space-x-2">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className={`flex-1 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
            isDark ? "bg-gray-800 text-white" : "bg-blue-100 text-blue-900"
          }`}
          placeholder="Enter a task..."
        />
        <button
          onClick={handleAdd}
          className={`px-4 py-3 rounded-lg transition flex items-center ${
            isDark 
              ? "bg-blue-500 hover:bg-blue-600 text-white" 
              : "bg-blue-400 hover:bg-blue-500 text-blue-900"
          }`}
        >
          <Plus size={20} />
        </button>
      </div>
      <div className="flex flex-col gap-1">
        <label className={`text-sm ${isDark ? "text-gray-400" : "text-blue-700"}`}>
          Please enter the date your task is due
        </label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className={`p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
            isDark ? "bg-gray-800 text-white" : "bg-blue-100 text-blue-900"
          }`}
        />
      </div>
    </div>
  );
}