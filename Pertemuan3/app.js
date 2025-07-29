const express = require('express');

const app = express();
const port = 3000;
app.use(express.json());

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render("index");
});

app.get("/contact", (req, res) => {
    res.render("contact");
});

app.use((req, res, next) => {
    res.status(404).render("404 - Page Not Found");
});

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});