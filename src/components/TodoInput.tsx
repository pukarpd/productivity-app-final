import { useState, useEffect } from "react";
import { Plus, ChevronDown, ChevronUp } from "lucide-react";
import { useTodoStore } from "@/app/useTodoStore"; // ✅ Import notification hook

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

  const { setNotification } = useTodoStore(); // ✅ Use notification system

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

    // ✅ Trigger success notification
    setNotification({ type: "success", message: "Task added successfully." });

    // Reset fields and errors
    setTask("");
    setDescription("");
    setSubTasks("");
    setDueDate("");
    setDateError("");
    setTaskError("");
    setShowOptions(false);
  };

  const Label = ({ text }: { text: string }) => (
    <label className={`text-sm font-medium ${isDark ? "text-gray-300" : "text-blue-700"}`}>{text}</label>
  );

  return (
    <div className="flex flex-col w-full max-w-md gap-4">
      {/* Task Name Input */}
      <div className="flex flex-col gap-1">
        <Label text="Task Name *" />
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
          {/* Description Input */}
          <div className="flex flex-col gap-1">
            <Label text="Description (Optional)" />
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
            <Label text="Sub-tasks (Optional)" />
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
            <Label text="Due Date (Optional)" />
            <input
              type="date"
              value={dueDate}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => {
                setDueDate(e.target.value);
                setDateError("");

                // ✅ Trigger due date feedback
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
