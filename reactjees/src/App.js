import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import TodoPage from "./pages/Todo/TodoPage";
import "./App.css";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/todos" element={<TodoPage />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        transition={Bounce}
        theme="colored"
      />
    </Router>
  );
}

export default App;
