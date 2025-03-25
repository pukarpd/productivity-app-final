import { create } from "zustand";

interface SubTask {
  id: number;
  text: string;
  completed: boolean;
}

interface Todo {
  id: number;
  text: string;
  description?: string; // New field for task description
  completed: boolean;
  dueDate?: string;
  subTasks?: SubTask[]; // New field for sub-tasks
}

interface Notification {
  message: string;
  type: "success" | "error";
}

interface TodoStore {
  todos: Todo[];
  notification: Notification | null;
  addTodo: (todo: { text: string; description?: string; dueDate?: string; subTasks?: string[] }) => void;
  toggleTodo: (id: number) => void;
  toggleSubTask: (todoId: number, subTaskId: number) => void; // New function
  deleteTodo: (id: number) => void;
  clearCompleted: () => void;
  setNotification: (notification: Notification | null) => void;
}

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  notification: null,
  setNotification: (notification) => set({ notification }),
  addTodo: ({ text, description, dueDate, subTasks }) =>
    set((state) => {
      const newTodo = {
        id: Date.now(),
        text,
        description: description || undefined,
        completed: false,
        dueDate: dueDate || undefined,
        subTasks: subTasks?.map((subText, index) => ({
          id: Date.now() + index, // Unique ID for each sub-task
          text: subText,
          completed: false,
        })),
      };
      
      // Set success notification
      setTimeout(() => {
        set({ notification: { message: "Task added successfully!", type: "success" } });
        // Clear notification after 3 seconds
        setTimeout(() => set({ notification: null }), 3000);
      }, 0);

      return {
        todos: [...state.todos, newTodo],
      };
    }),
  toggleTodo: (id) =>
    set((state) => {
      const todo = state.todos.find(t => t.id === id);
      if (!todo) return state;

      const newCompleted = !todo.completed;
      
      // Set completion notification
      setTimeout(() => {
        set({ 
          notification: { 
            message: `Task "${todo.text}" marked as ${newCompleted ? 'completed' : 'incomplete'}`, 
            type: "success" 
          } 
        });
        // Clear notification after 3 seconds
        setTimeout(() => set({ notification: null }), 3000);
      }, 0);

      return {
        todos: state.todos.map((todo) =>
          todo.id === id ? { ...todo, completed: newCompleted } : todo
        ),
      };
    }),
  toggleSubTask: (todoId, subTaskId) =>
    set((state) => {
      const todo = state.todos.find(t => t.id === todoId);
      if (!todo || !todo.subTasks) return state;

      const subTask = todo.subTasks.find(st => st.id === subTaskId);
      if (!subTask) return state;

      const newCompleted = !subTask.completed;

      // Set completion notification
      setTimeout(() => {
        set({ 
          notification: { 
            message: `Sub-task "${subTask.text}" marked as ${newCompleted ? 'completed' : 'incomplete'}`, 
            type: "success" 
          } 
        });
        // Clear notification after 3 seconds
        setTimeout(() => set({ notification: null }), 3000);
      }, 0);

      return {
        todos: state.todos.map((todo) =>
          todo.id === todoId && todo.subTasks
            ? {
                ...todo,
                subTasks: todo.subTasks.map((subTask) =>
                  subTask.id === subTaskId ? { ...subTask, completed: newCompleted } : subTask
                ),
              }
            : todo
        ),
      };
    }),
  deleteTodo: (id) =>
    set((state) => {
      // Set success notification
      setTimeout(() => {
        set({ notification: { message: "Task deleted successfully!", type: "success" } });
        // Clear notification after 3 seconds
        setTimeout(() => set({ notification: null }), 3000);
      }, 0);

      return {
        todos: state.todos.filter((todo) => todo.id !== id),
      };
    }),
  clearCompleted: () =>
    set((state) => {
      const completedCount = state.todos.filter(todo => todo.completed).length;
      
      if (completedCount > 0) {
        // Set success notification
        setTimeout(() => {
          set({ 
            notification: { 
              message: `Cleared ${completedCount} completed ${completedCount === 1 ? 'task' : 'tasks'}`, 
              type: "success" 
            } 
          });
          // Clear notification after 3 seconds
          setTimeout(() => set({ notification: null }), 3000);
        }, 0);
      }

      return {
        todos: state.todos.filter((todo) => !todo.completed),
      };
    }),
}));