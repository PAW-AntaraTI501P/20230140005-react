import { useState } from "react";
import { motion } from "framer-motion";

const TodoItem = ({ todo, onToggleCompleted, onDeleteTodo, onEditTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(todo.task);

  const handleSave = () => {
    if (editedTask.trim() !== "") {
      onEditTodo(todo.id, editedTask);
      setIsEditing(false);
    }
  };

  return (
    <motion.li
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.3 }}
      className={`p-4 rounded-lg shadow flex flex-col gap-3 ${
        todo.completed ? "bg-green-100" : "bg-white"
      }`}
    >
      <div className="flex justify-between items-center">
        {isEditing ? (
          <input
            type="text"
            value={editedTask}
            onChange={(e) => setEditedTask(e.target.value)}
            className="flex-1 mr-3 px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-400"
          />
        ) : (
          <h3
            className={`text-lg font-medium ${
              todo.completed ? "line-through text-gray-500" : "text-gray-800"
            }`}
          >
            {todo.task}
          </h3>
        )}

        <div className="flex gap-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                Simpan
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditedTask(todo.task);
                }}
                className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
              >
                Batal
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => onToggleCompleted(todo.id, todo.completed)}
                className={`px-3 py-1 rounded text-white transition ${
                  todo.completed
                    ? "bg-yellow-500 hover:bg-yellow-600"
                    : "bg-green-500 hover:bg-green-600"
                }`}
              >
                {todo.completed ? "Belum Selesai" : "Selesai"}
              </button>
              <button
                onClick={() => setIsEditing(true)}
                className="px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
              >
                Edit
              </button>
              <button
                onClick={() => onDeleteTodo(todo.id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Hapus
              </button>
            </>
          )}
        </div>
      </div>
    </motion.li>
  );
};

export default TodoItem;
