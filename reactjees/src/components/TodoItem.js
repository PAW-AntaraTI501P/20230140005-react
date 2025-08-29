import React, { useState } from "react";

const TodoItem = ({ todo, onToggleCompleted, onDeleteTodo, onEditTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(todo.task);

  const handleSave = () => {
    if (editedTask.trim() !== "") {
      onEditTodo(todo.id, editedTask);
      setIsEditing(false); // keluar dari mode edit
    }
  };

  return (
    <li
      style={{
        marginBottom: "10px",
        border: "1px solid white",
        padding: "10px",
        borderRadius: "8px",
        backgroundColor: todo.completed ? "#2d3d3d" : "transparent",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        {isEditing ? (
          <input
            type="text"
            value={editedTask}
            onChange={(e) => setEditedTask(e.target.value)}
            style={{
              flex: 1,
              marginRight: "10px",
              padding: "5px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        ) : (
          <h3
            style={{
              margin: 0,
              textDecoration: todo.completed ? "line-through" : "none",
            }}
          >
            {todo.task}
          </h3>
        )}

        <div style={{ display: "flex", gap: "5px" }}>
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                style={{
                  padding: "5px 10px",
                  borderRadius: "4px",
                  backgroundColor: "lightblue",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Simpan
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditedTask(todo.task);
                }}
                style={{
                  padding: "5px 10px",
                  borderRadius: "4px",
                  backgroundColor: "gray",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Batal
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => onToggleCompleted(todo.id, todo.completed)}
                style={{
                  padding: "5px 10px",
                  borderRadius: "4px",
                  backgroundColor: todo.completed ? "salmon" : "lightgreen",
                  color: "#282c34",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {todo.completed ? "Belum Selesai" : "Selesai"}
              </button>
              <button
                onClick={() => setIsEditing(true)}
                style={{
                  padding: "5px 10px",
                  borderRadius: "4px",
                  backgroundColor: "orange",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Edit
              </button>
              <button
                onClick={() => onDeleteTodo(todo.id)}
                style={{
                  padding: "5px 10px",
                  borderRadius: "4px",
                  backgroundColor: "tomato",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Hapus
              </button>
            </>
          )}
        </div>
      </div>
    </li>
  );
};

export default TodoItem;
