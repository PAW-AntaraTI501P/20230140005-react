import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import TodoPage from "./pages/Todo/TodoPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import LoginPage from "./pages/Auth/LoginPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Navbar */}
        <nav className="bg-indigo-600 text-white px-6 py-4 shadow-md flex justify-between items-center">
          <h1 className="text-xl font-bold">🚀 React Todo</h1>
          <div className="space-x-6">
            <Link to="/" className="hover:text-yellow-300">Home</Link>
            <Link to="/todo" className="hover:text-yellow-300">Todo</Link>
            <Link to="/register" className="hover:text-yellow-300">Register</Link>
            <Link to="/login" className="hover:text-yellow-300">Login</Link>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/todo" element={<TodoPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
