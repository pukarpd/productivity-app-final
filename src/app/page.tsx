"use client";

import { useState } from "react";
import { create } from "zustand";
import { motion } from "framer-motion";
import { Trash, Check, Plus } from "lucide-react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoStore {
  todos: Todo[];
  addTodo: (text: string) => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}

const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  addTodo: (text) =>
    set((state) => ({
      todos: [...state.todos, { id: Date.now(), text, completed: false }],
    })),
  toggleTodo: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    })),
  deleteTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),
}));

export default function Home() {
  const [task, setTask] = useState("");
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodoStore();

  const handleAdd = () => {
    if (task.trim()) {
      addTodo(task);
      setTask("");
    }
  };

  return (
    <main className="min-h-screen bg-gray-900 flex flex-col items-center py-12 px-4">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-white mb-6"
      >
        📝 My To-Do List
      </motion.h1>

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

      <div className="mt-6 w-full max-w-md">
        {todos.length === 0 ? (
          <p className="text-gray-400 text-center">No tasks yet. Add one!</p>
        ) : (
          todos.map((todo) => (
            <motion.div
              key={todo.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex items-center justify-between bg-gray-800 p-3 my-2 rounded-lg"
            >
              <span
                onClick={() => toggleTodo(todo.id)}
                className={`text-lg cursor-pointer ${
                  todo.completed ? "line-through text-gray-500" : "text-white"
                }`}
              >
                {todo.text}
              </span>
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
          ))
        )}
      </div>
    </main>
  );
}
