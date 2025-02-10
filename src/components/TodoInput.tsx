// Component for adding a new to-do task
import { useState } from "react";
import { Plus } from "lucide-react";

interface TodoInputProps {
  addTodo: (text: string) => void;
}

export default function TodoInput({ addTodo }: TodoInputProps) {
  const [task, setTask] = useState("");

  const handleAdd = () => {
    if (task.trim()) {
      addTodo(task);
      setTask(""); // Reset input after adding
    }
  };

  return (
    <div className="flex w-full max-w-md space-x-2">
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="flex-1 p-3 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 outline-none"
        placeholder="Enter a task..."
      />
      <button
        onClick={handleAdd}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg transition flex items-center"
      >
        <Plus size={20} />
      </button>
    </div>
  );
}
