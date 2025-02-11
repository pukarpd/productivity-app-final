import TodoItem from "./TodoItem";

interface TodoListProps {
  todos: { 
    id: number; 
    text: string; 
    completed: boolean;
    dueDate?: string;
  }[];
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  isDark: boolean;
}

export default function TodoList({ todos, toggleTodo, deleteTodo, isDark }: TodoListProps) {
  return (
    <div className="mt-6 w-full max-w-md">
      {todos.length === 0 ? (
        <p className={`text-center ${isDark ? "text-gray-400" : "text-blue-700"}`}>
          No tasks yet. Add one!
        </p>
      ) : (
        todos.map((todo) => (
          <TodoItem 
            key={todo.id} 
            todo={todo} 
            toggleTodo={toggleTodo} 
            deleteTodo={deleteTodo}
            isDark={isDark}
          />
        ))
      )}
    </div>
  );
}