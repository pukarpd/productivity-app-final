import { useState, useEffect } from "react";
import { Plus } from "lucide-react";

interface TodoInputProps {
  addTodo: (todo: { text: string; description?: string; dueDate?: string; subTasks?: string[] }) => void;
}

export default function TodoInput({ addTodo }: TodoInputProps) {
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [subTasks, setSubTasks] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [dateError, setDateError] = useState("");
  const [taskError, setTaskError] = useState("");
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
      setTaskError("Task name cannot be empty.");
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
      description: description.trim() || undefined,
      dueDate: dueDate || undefined,
      subTasks: subTaskArray.length > 0 ? subTaskArray : undefined,
    });

    // Reset fields and errors
    setTask("");
    setDescription("");
    setSubTasks("");
    setDueDate("");
    setDateError("");
    setTaskError("");
  };

  return (
    <div className="flex flex-col w-full max-w-md gap-4">
      {/* Task Name Input */}
      <div className="flex flex-col gap-1">
        <label className={`text-sm font-medium ${isDark ? "text-gray-300" : "text-blue-700"}`}>
          Task Name *
        </label>
        <div className="flex w-full space-x-2">
          <input
            type="text"
            value={task}
            onChange={(e) => {
              setTask(e.target.value);
              setTaskError("");
            }}
            className={`flex-1 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
              isDark ? "bg-gray-800 text-white" : "bg-blue-100 text-blue-900"
            }`}
            placeholder="Enter task name..."
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
        {taskError && <span className="text-sm text-red-500">{taskError}</span>}
      </div>

      {/* Description Input */}
      <div className="flex flex-col gap-1">
        <label className={`text-sm font-medium ${isDark ? "text-gray-300" : "text-blue-700"}`}>
          Description (Optional)
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={`p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
            isDark ? "bg-gray-800 text-white" : "bg-blue-100 text-blue-900"
          }`}
          placeholder="Add a description for your task..."
          rows={2}
        />
      </div>

      {/* Sub-tasks Input */}
      <div className="flex flex-col gap-1">
        <label className={`text-sm font-medium ${isDark ? "text-gray-300" : "text-blue-700"}`}>
          Sub-tasks (Optional)
        </label>
        <textarea
          value={subTasks}
          onChange={(e) => setSubTasks(e.target.value)}
          className={`p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
            isDark ? "bg-gray-800 text-white" : "bg-blue-100 text-blue-900"
          }`}
          placeholder="Enter sub-tasks (one per line)"
          rows={3}
        />
      </div>

      {/* Due Date Input */}
      <div className="flex flex-col gap-1">
        <label className={`text-sm font-medium ${isDark ? "text-gray-300" : "text-blue-700"}`}>
          Due Date (Optional)
        </label>
        <input
          type="date"
          value={dueDate}
          min={new Date().toISOString().split("T")[0]}
          onChange={(e) => {
            setDueDate(e.target.value);
            setDateError("");
          }}
          className={`p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
            isDark ? "bg-gray-800 text-white" : "bg-blue-100 text-blue-900"
          }`}
        />
        {dateError && <span className="text-sm text-red-500">{dateError}</span>}
      </div>
    </div>
  );
}
