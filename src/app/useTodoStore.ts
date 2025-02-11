import { create } from "zustand";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  dueDate?: string;
}

interface TodoStore {
  todos: Todo[];
  addTodo: (todo: { text: string; dueDate?: string }) => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  addTodo: ({ text, dueDate }) =>
    set((state) => ({
      todos: [...state.todos, { 
        id: Date.now(), 
        text, 
        completed: false,  
        dueDate 
      }],
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