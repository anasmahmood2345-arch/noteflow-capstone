
const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();

app.use(express.json());
app.use(cors());

const notesRouter = require("./routes/notes");
const authRouter = require("./routes/auth");

app.use("/api/notes", authMiddleware, notesRouter);
app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to NoteFlow API"
    });
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

module.exports = app;

