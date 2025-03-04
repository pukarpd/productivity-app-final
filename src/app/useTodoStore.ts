import { create } from "zustand";

interface SubTask {
  id: number;
  text: string;
  completed: boolean;
}

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  dueDate?: string;
  subTasks?: SubTask[]; // New field for sub-tasks
}

interface TodoStore {
  todos: Todo[];
  addTodo: (todo: { text: string; dueDate?: string; subTasks?: string[] }) => void;
  toggleTodo: (id: number) => void;
  toggleSubTask: (todoId: number, subTaskId: number) => void; // New function
  deleteTodo: (id: number) => void;
  clearCompleted: () => void;
}

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  addTodo: ({ text, dueDate, subTasks }) =>
    set((state) => ({
      todos: [
        ...state.todos,
        {
          id: Date.now(),
          text,
          completed: false,
          dueDate: dueDate || undefined,
          subTasks: subTasks?.map((subText, index) => ({
            id: Date.now() + index, // Unique ID for each sub-task
            text: subText,
            completed: false,
          })),
        },
      ],
    })),
  toggleTodo: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    })),
  toggleSubTask: (todoId, subTaskId) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === todoId && todo.subTasks
          ? {
              ...todo,
              subTasks: todo.subTasks.map((subTask) =>
                subTask.id === subTaskId ? { ...subTask, completed: !subTask.completed } : subTask
              ),
            }
          : todo
      ),
    })),
  deleteTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),
  clearCompleted: () =>
    set((state) => ({
      todos: state.todos.filter((todo) => !todo.completed),
    })),
}));