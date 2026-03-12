const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const db = new sqlite3.Database("./database.db");

// create table
db.run(`
CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    content TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
`);

// GET posts
app.get("/api/posts", (req, res) => {
    db.all("SELECT * FROM posts ORDER BY created_at DESC", [], (err, rows) => {
        res.json(rows);
    });
});

// GET single post
app.get("/api/posts/:id", (req, res) => {
    db.get("SELECT * FROM posts WHERE id = ?", [req.params.id], (err, row) => {
        res.json(row);
    });
});

// CREATE post
app.post("/api/posts", (req, res) => {
    const { title, content } = req.body;

    db.run(
        "INSERT INTO posts (title, content) VALUES (?, ?)",
        [title, content],
        function (err) {
            res.json({ id: this.lastID });
        }
    );
});

// UPDATE post
app.put("/api/posts/:id", (req, res) => {
    const { title, content } = req.body;

    db.run(
        "UPDATE posts SET title=?, content=? WHERE id=?",
        [title, content, req.params.id],
        () => {
            res.json({ updated: true });
        }
    );
});

// DELETE post
app.delete("/api/posts/:id", (req, res) => {
    db.run("DELETE FROM posts WHERE id=?", [req.params.id], () => {
        res.json({ deleted: true });
    });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});