const express = require('express');
require("dotenv").config();
const app = express();
// const port = 3000;
const todoRoutes = require("./routes/todo.js");
const { todos } = require("./routes/todo.js");
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/todos', todoRoutes);


app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render("index");
});

app.get("/contact", (req, res) => {
    res.render("contact");
});

app.get("/todos-data", (req, res) => {
    res.json(todos);
});

app.get("/todos-list", (req, res) => {
    res.render("todos-page", { todos: todos });
});

app.use((req, res) => {
    res.status(404).send("404 - Page Not Found");
});

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');



app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});