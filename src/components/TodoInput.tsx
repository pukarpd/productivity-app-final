import { useState, useEffect } from "react";
import { Plus, ChevronDown, ChevronUp } from "lucide-react";
import { useTodoStore } from "@/app/useTodoStore";

interface TodoInputProps {
  addTodo: (todo: { text: string; description?: string; dueDate?: string; subTasks?: string[] }) => void;
}

export default function TodoInput({ addTodo }: TodoInputProps) {
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [subTasks, setSubTasks] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [dateError, setDateError] = useState("");
  const [taskError, setTaskError] = useState("");
  const [isDark, setIsDark] = useState(() => localStorage.getItem("theme") === "dark");

  const { setNotification } = useTodoStore();

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

    setNotification({ type: "success", message: "Task added successfully." });

    setTask("");
    setDescription("");
    setSubTasks("");
    setDueDate("");
    setDateError("");
    setTaskError("");
    setShowOptions(false);
  };

  const LabelWithTooltip = ({ label, tooltip }: { label: string; tooltip: string }) => (
    <label className={`text-base font-semibold flex items-center gap-2 ${isDark ? "text-gray-300" : "text-blue-700"}`}>
      {label}
      <div className="relative group cursor-pointer">
        <span className="text-sm text-blue-400">❓</span>
        <div className="absolute z-10 w-56 p-2 text-xs text-white bg-gray-700 rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 top-[-10px] left-5">
          {tooltip}
        </div>
      </div>
    </label>
  );

  return (
    <div className="flex flex-col w-full max-w-[640px] gap-4">
      {/* Task Name Input */}
      <div className="flex flex-col gap-1">
        <LabelWithTooltip
          label="Task Name *"
          tooltip="What do you need to get done? Add a short title for your task."
        />
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
            disabled={!task.trim()}
            className={`px-4 py-3 rounded-lg transition flex items-center justify-center font-bold ${
              isDark
                ? task.trim()
                  ? "bg-blue-400 hover:bg-blue-500 text-white shadow-lg"
                  : "bg-blue-800 text-white/40 cursor-not-allowed"
                : task.trim()
                ? "bg-blue-500 hover:bg-blue-600 text-white shadow-md"
                : "bg-blue-200 text-blue-500 cursor-not-allowed"
            }`}
          >
            <span className="text-xl">+</span>
          </button>
        </div>
        {taskError && <span className="text-sm text-red-500">{taskError}</span>}
      </div>

      {/* Toggle Optional Fields */}
      <button
        onClick={() => setShowOptions((prev) => !prev)}
        className={`text-sm font-medium self-start flex items-center gap-1 transition ${
          isDark ? "text-blue-300 hover:text-white" : "text-blue-700 hover:text-blue-900"
        }`}
      >
        {showOptions ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        {showOptions ? "Hide Options" : "More Options"}
      </button>

      {/* Optional Fields */}
      {showOptions && (
        <>
          {/* Description */}
          <div className="flex flex-col gap-1">
            <LabelWithTooltip
              label="Description (Optional)"
              tooltip="Optional: add more detail so you know what this task is about."
            />
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

          {/* Sub-tasks */}
          <div className="flex flex-col gap-1">
            <LabelWithTooltip
              label="Sub-tasks (Optional)"
              tooltip="Optional: break this task into smaller steps. One per line."
            />
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

          {/* Due Date */}
          <div className="flex flex-col gap-1">
            <LabelWithTooltip
              label="Due Date (Optional)"
              tooltip="Optional: select when this task should be finished."
            />
            <input
              type="date"
              value={dueDate}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => {
                setDueDate(e.target.value);
                setDateError("");

                if (e.target.value) {
                  const formatted = new Date(e.target.value).toLocaleDateString();
                  setNotification({
                    type: "success",
                    message: `Due date set to ${formatted}`,
                  });
                }
              }}
              className={`p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
                isDark ? "bg-gray-800 text-white" : "bg-blue-100 text-blue-900"
              }`}
            />
            {dateError && <span className="text-sm text-red-500">{dateError}</span>}
          </div>
        </>
      )}
    </div>
  );
}
