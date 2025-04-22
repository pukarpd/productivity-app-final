// TodoList.tsx - Add tooltip to the "Clear Completed" button
import TodoItem from "./TodoItem";
import { useTodoStore } from "@/app/useTodoStore";
import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";

interface TodoListProps {
  todos: { 
    id: number; 
    text: string; 
    completed: boolean;
    dueDate?: string;
  }[];
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}

export default function TodoList({ todos, toggleTodo, deleteTodo }: TodoListProps) {
  const { clearCompleted } = useTodoStore();
  const [sortBy, setSortBy] = useState<"default" | "dueDate">("default");
  const [isDark, setIsDark] = useState(() => localStorage.getItem("theme") === "dark");
  const [showDeleteTooltip, setShowDeleteTooltip] = useState(false);

  useEffect(() => {
    const handleStorageChange = () => {
      setIsDark(localStorage.getItem("theme") === "dark");
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Sort todos based on the selected option
  const sortedTodos = [...todos].sort((a, b) => {
    if (sortBy === "dueDate") {
      if (a.dueDate && b.dueDate) {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
      return a.dueDate ? -1 : b.dueDate ? 1 : 0;
    } else {
      // Default sort: incomplete first, then by ID
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
      return a.id - b.id;
    }
  });

  // 🔒 Lock the ID of the top task
  const priorityTaskId = sortedTodos[0]?.id;

  return (
    <div className="mt-6 w-full max-w-md">
      {/* Sorting and Clear Completed Buttons */}
      <div className="flex justify-between items-center mb-4">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as "default" | "dueDate")}
          className={`p-2 rounded-lg ${
            isDark ? "bg-gray-800 text-white" : "bg-blue-100 text-blue-900"
          }`}
        >
          <option value="default">Sort by Default</option>
          <option value="dueDate">Sort by Due Date</option>
        </select>

        {/* Delete button with tooltip */}
        <div className="relative">
          <button
            onClick={clearCompleted}
            onMouseEnter={() => setShowDeleteTooltip(true)}
            onMouseLeave={() => setShowDeleteTooltip(false)}
            className={`p-2 rounded-lg ${
              isDark
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-red-400 hover:bg-red-500 text-red-900"
            }`}
          >
            <Trash2 size={32} />
          </button>
          
          {/* Tooltip */}
          {showDeleteTooltip && (
            <div 
              className={`absolute right-0 bottom-full mb-2 py-1 px-2 rounded text-sm ${
                isDark ? "bg-gray-800 text-white" : "bg-white text-gray-800"
              } shadow-lg whitespace-nowrap z-10`}
            >
              Delete all completed tasks
            </div>
          )}
        </div>
      </div>

      {/* Task List */}
      {sortedTodos.length === 0 ? (
        <p className={`text-center ${isDark ? "text-gray-400" : "text-blue-700"}`}>
          No tasks yet. Add one!
        </p>
      ) : (
        sortedTodos.map((todo) => (
          <TodoItem 
            key={todo.id} 
            todo={todo} 
            toggleTodo={toggleTodo} 
            deleteTodo={deleteTodo}
            isPriority={todo.id === priorityTaskId}
          />
        ))
      )}
    </div>
  );
}
