import { useState } from "react";

const TodoForm = ({ onAddTodo }) => {
  const [task, setTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.trim()) return;
    onAddTodo(task);
    setTask("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 w-full"
    >
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Tambah todo baru..."
        className="flex-grow px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-400 outline-none"
      />
      <button
        type="submit"
        className="px-5 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-lg shadow transition"
      >
        ➕ Add
      </button>
    </form>
  );
};

export default TodoForm;
