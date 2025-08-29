import React, { useState, useEffect, useCallback } from "react";
import TodoForm from "../../components/TodoForm.js";
import TodoList from "../../components/TodoList.js";
import SearchInput from "../../components/SearchInput.js";
import { toast } from "react-toastify";

const TodoPage = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");


  const fetchTodos = useCallback((searchQuery) => {
    setLoading(true);
    const url = searchQuery
      ? `/api/todos?search=${encodeURIComponent(searchQuery)}`
      : "/api/todos";

    fetch(url)
      .then((response) => {
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        setTodos(data.todos);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setTodos([]);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const timerId = setTimeout(() => {
      fetchTodos(searchTerm);
    }, 500);
    return () => clearTimeout(timerId);
  }, [searchTerm, fetchTodos]);

  // ✅ Tambah todo
  const handleAddTodo = (task) => {
    fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task }),
    })
      .then((response) => response.json())
      .then((data) => {
        setTodos([...todos, { id: data.id, task: data.task, completed: false }]);
        toast.success("✅ Todo berhasil ditambahkan!", {
          style: { backgroundColor: "#4CAF50", color: "white" },
        });
      })
      .catch((err) => {
        console.error("Error adding todo:", err);
        toast.error("❌ Gagal menambahkan todo!");
      });
  };

  // ✅ Delete todo
  const handleDeleteTodo = (id) => {
    fetch(`/api/todos/${id}`, { method: "DELETE" })
      .then(() => {
        setTodos(todos.filter((todo) => todo.id !== id));
        toast.error("🗑️ Todo berhasil dihapus!", {
          style: { backgroundColor: "#e74c3c", color: "white" },
        });
      })
      .catch((err) => {
        console.error("Error deleting todo:", err);
        toast.error("❌ Gagal menghapus todo!");
      });
  };

  // ✅ Toggle selesai / belum
  const handleToggleCompleted = (id, completed) => {
    fetch(`/api/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !completed }),
    })
      .then(() => {
        setTodos(
          todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !completed } : todo
          )
        );
        toast.info(
          !completed ? "🎉 Todo ditandai selesai!" : "↩️ Todo ditandai belum selesai",
          { style: { backgroundColor: "#3498db", color: "white" } }
        );
      })
      .catch((err) => console.error("Error updating todo:", err));
  };

  // ✅ Edit todo
  const handleEditTodo = (id, newTask) => {
    fetch(`/api/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task: newTask }),
    })
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then(() => {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === id ? { ...todo, task: newTask } : todo
          )
        );
        toast.warn("✏️ Todo berhasil diedit!", {
          style: { backgroundColor: "#f39c12", color: "white" },
        });
      })
      .catch((err) => {
        console.error("Error editing todo:", err);
        toast.error("❌ Gagal mengedit todo!");
      });
  };

  if (loading) return <div style={{ textAlign: "center" }}>Loading...</div>;
  if (error) return <div style={{ textAlign: "center", color: "red" }}>Error: {error}</div>;

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "800px",
        margin: "0 auto",
        fontFamily: "sans-serif",
      }}
    >
      <header style={{ textAlign: "center" }}>
        <h1>Aplikasi Todo List</h1>
        <TodoForm onAddTodo={handleAddTodo} />
        <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <h2>Daftar Tugas Anda</h2>
        <TodoList
          todos={todos}
          onToggleCompleted={handleToggleCompleted}
          onDeleteTodo={handleDeleteTodo}
          onEditTodo={handleEditTodo}
        />
      </header>
    </div>
  );
};

export default TodoPage;
