import { useState, useEffect } from "react";
import { Plus } from "lucide-react";

interface TodoInputProps {
  addTodo: (todo: { text: string; dueDate?: string; subTasks?: string[] }) => void;
}

export default function TodoInput({ addTodo }: TodoInputProps) {
  const [task, setTask] = useState("");
  const [subTasks, setSubTasks] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [dateError, setDateError] = useState("");
  const [taskError, setTaskError] = useState(""); // NEW: State for error message
  const [isDark, setIsDark] = useState(() => localStorage.getItem("theme") === "dark");

  useEffect(() => {
    const handleStorageChange = () => {
      setIsDark(localStorage.getItem("theme") === "dark");
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleAdd = () => {
    if (!task.trim()) {
      setTaskError("Task name cannot be empty."); // Show error if task name is empty
      return;
    }

    if (dueDate) {
      const selectedDate = new Date(dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        setDateError("Due date cannot be in the past");
        return;
      }
    }

    const subTaskArray = subTasks
      .split("\n")
      .map((s) => s.trim())
      .filter((s) => s);

    addTodo({
      text: task.trim(),
      dueDate: dueDate || undefined,
      subTasks: subTaskArray.length > 0 ? subTaskArray : undefined,
    });

    // Reset fields and errors
    setTask("");
    setSubTasks("");
    setDueDate("");
    setDateError("");
    setTaskError(""); // Clear task error after adding
  };

  return (
    <div className="flex flex-col w-full max-w-md gap-2">
      <div className="flex w-full space-x-2">
        <input
          type="text"
          value={task}
          onChange={(e) => {
            setTask(e.target.value);
            setTaskError(""); // Clear error when user starts typing
          }}
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

      {/* Error Message for Empty Task Name */}
      {taskError && <span className="text-sm text-red-500 mt-1">{taskError}</span>}

      <textarea
        value={subTasks}
        onChange={(e) => setSubTasks(e.target.value)}
        className={`p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
          isDark ? "bg-gray-800 text-white" : "bg-blue-100 text-blue-900"
        }`}
        placeholder="Enter sub-tasks (one per line)"
        rows={3}
      />

      <div className="flex flex-col gap-1">
        <label className={`text-sm ${isDark ? "text-gray-400" : "text-blue-700"}`}>
          Please enter the date your task is due
        </label>
        <input
          type="date"
          value={dueDate}
          min={new Date().toISOString().split("T")[0]}
          onChange={(e) => {
            setDueDate(e.target.value);
            setDateError("");
          }}
          className={`p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
            isDark ? "bg-gray-800 text-white" : "bg-blue-100 text-blue-900"
          }`}
        />
        {dateError && <span className="text-sm text-red-500 mt-1">{dateError}</span>}
      </div>
    </div>
  );
}
