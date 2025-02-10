// Component for rendering a single to-do item
import { motion } from "framer-motion";
import { Trash, Check } from "lucide-react";

interface TodoItemProps {
  todo: { id: number; text: string; completed: boolean };
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}

export default function TodoItem({ todo, toggleTodo, deleteTodo }: TodoItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="flex items-center justify-between bg-gray-800 p-3 my-2 rounded-lg"
    >
      {/* Toggle task completion on click */}
      <span
        onClick={() => toggleTodo(todo.id)}
        className={`text-lg cursor-pointer ${
          todo.completed ? "line-through text-gray-500" : "text-white"
        }`}
      >
        {todo.text}
      </span>

      {/* Action buttons for toggling and deleting */}
      <div className="flex space-x-2">
        <button
          onClick={() => toggleTodo(todo.id)}
          className="p-2 bg-green-500 hover:bg-green-600 rounded-full transition"
        >
          <Check size={18} />
        </button>
        <button
          onClick={() => deleteTodo(todo.id)}
          className="p-2 bg-red-500 hover:bg-red-600 rounded-full transition"
        >
          <Trash size={18} />
        </button>
      </div>
    </motion.div>
  );
}
