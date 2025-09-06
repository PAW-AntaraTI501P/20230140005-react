import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-center px-6">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl font-extrabold mb-4 drop-shadow-lg"
      >
        Selamat Datang 👋
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-lg mb-8 max-w-lg"
      >
        Ini adalah aplikasi Todo modern dengan React + Express + MySQL.  
        Mulai catat kegiatanmu sekarang!
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="flex gap-4"
      >
        <a href="/todo" className="px-6 py-3 bg-white text-indigo-700 rounded-xl shadow-lg font-semibold hover:bg-gray-200 transition">
          🚀 Lihat Todo
        </a>
        <a href="/register" className="px-6 py-3 bg-yellow-400 text-black rounded-xl shadow-lg font-semibold hover:bg-yellow-300 transition">
          📝 Register
        </a>
        <a href="/login" className="px-6 py-3 bg-green-400 text-black rounded-xl shadow-lg font-semibold hover:bg-green-300 transition">
          🔑 Login
        </a>
      </motion.div>
    </div>
  );
}
