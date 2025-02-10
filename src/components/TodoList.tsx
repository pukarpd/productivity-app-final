// Component that displays the list of todos
import TodoItem from "./TodoItem";

interface TodoListProps {
  todos: { id: number; text: string; completed: boolean }[];
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}

export default function TodoList({ todos, toggleTodo, deleteTodo }: TodoListProps) {
  return (
    <div className="mt-6 w-full max-w-md">
      {todos.length === 0 ? (
        <p className="text-gray-400 text-center">No tasks yet. Add one!</p>
      ) : (
        todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
        ))
      )}
    </div>
  );
}
