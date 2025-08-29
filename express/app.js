const express = require("express");
require('dotenv').config({ path: __dirname + '/.env' });
const app = express();
// const port = 3000;
const todoRoutes = require("./routes/tododb.js");
const { todos } = require("./routes/todo.js");
const db = require("./Database/db.js");
const port = process.env.PORT || 3000;
const expressLayouts = require("express-ejs-layouts");
app.use(expressLayouts);
app.set('layout', 'layouts/main-layout');
app.use(express.json());
app.use("/todos", todoRoutes);


app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index")
});

app.get("/contact", (req, res) => {
    res.render("contact");
});

app.get("/todos-data", (req, res) => {
    res.json(todos);
});

app.get("/todo-list", (req, res) => {
    res.render("todos-page", { todos: todos });
});

app.get("/todo-view", (req, res) => {
    db.query("SELECT * FROM todos", (err, todos) => {
        if (err) return res.status(500).send("Internal Server Error");
        res.render("todo", { todos: todos });
    });
});

// GET: Mengambil semua todos
app.get("/api/todos", (req, res) => {
  const { search } = req.query;
  console.log(
    `Menerima permintaan GET untuk todos. Kriteria pencarian: '${search}'`
  );

  let query = "SELECT * FROM todos";
  const params = [];

  if (search) {
    query += " WHERE task LIKE ?";
    params.push(`%${search}%`);
  }

  db.query(query, params, (err, todos) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    console.log("Berhasil mengirim todos:", todos.length, "item.");
    res.json({ todos: todos });
  });
});

// POST: Menambah todo baru
app.post("/api/todos", (req, res) => {
    const { task } = req.body;
    console.log("Menerima permintaan POST untuk menambah task:", task);

    if (!task) {
        console.error("Task tidak ditemukan di body permintaan.");
        return res.status(400).json({ error: 'Task is required' });
    }
    const query = 'INSERT INTO todos (task, completed) VALUES (?, ?)';
    db.query(query, [task, false], (err, result) => {
        if (err) {
            console.error("Database insert error:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        console.log("Todo berhasil ditambahkan dengan ID:", result.insertId);
        res.status(201).json({ 
            message: 'Todo added successfully', 
            id: result.insertId,
            task, 
            completed: false 
        });
    });
});

// PUT: Memperbarui status 'completed' saja
app.put("/api/todos/:id", (req, res) => {
  const { id } = req.params;
  const { task, completed } = req.body;

  console.log(`Menerima PUT untuk ID: ${id}, task: ${task}, completed: ${completed}`);

  let fields = [];
  let values = [];

  if (task !== undefined) {
    fields.push("task = ?");
    values.push(task);
  }

  if (completed !== undefined) {
    if (typeof completed !== "boolean") {
      return res.status(400).json({ error: "Invalid 'completed' value. Must be a boolean." });
    }
    fields.push("completed = ?");
    values.push(completed);
  }

  if (fields.length === 0) {
    return res.status(400).json({ error: "No valid fields to update" });
  }

  values.push(id);
  const query = `UPDATE todos SET ${fields.join(", ")} WHERE id = ?`;

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Database update error:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }
    console.log(`Todo ${id} berhasil diperbarui`);
    res.json({ message: "Todo updated successfully" });
  });
});


// DELETE: Menghapus todo berdasarkan ID
app.delete("/api/todos/:id", (req, res) => {
    const { id } = req.params;
    console.log(`Menerima permintaan DELETE untuk ID: ${id}`);
    const query = 'DELETE FROM todos WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error("Database delete error:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        if (result.affectedRows === 0) {
            console.error("Todo tidak ditemukan untuk ID:", id);
            return res.status(404).json({ error: 'Todo not found' });
        }
        console.log(`Todo dengan ID ${id} berhasil dihapus.`);
        res.json({ message: 'Todo deleted successfully' });
    });
});

app.use((req, res) => {
    res.status(404).send("404 - Page Not Found");
});

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");



app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});