import { motion, AnimatePresence } from "framer-motion";

const TodoList = ({ todos, onToggleCompleted, onDeleteTodo, onEditTodo }) => {
  return (
    <div className="space-y-3">
      <AnimatePresence>
        {todos.map((todo) => (
          <motion.div
            key={todo.id}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-between bg-white rounded-lg shadow p-3 border"
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggleCompleted(todo.id, todo.completed)}
                className="h-5 w-5 text-indigo-600"
              />
              <span
                className={`text-lg ${
                  todo.completed ? "line-through text-gray-500" : "text-gray-800"
                }`}
              >
                {todo.task}
              </span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  const newTask = prompt("Edit todo:", todo.task);
                  if (newTask) onEditTodo(todo.id, newTask);
                }}
                className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                ✏️
              </button>
              <button
                onClick={() => onDeleteTodo(todo.id)}
                className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                ❌
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TodoList;
