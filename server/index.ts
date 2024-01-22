
import express = require("express");
import mongoose from "mongoose";
const port = 3000;
import authRoutes from "./routes/auth";
import todoRoutes from "./routes/todo";
import cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/todo", todoRoutes);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

mongoose.connect('mongodb+srv://vishal:LXqSJK2wRfTsSjga@cluster0.wa3uqwh.mongodb.net/', { dbName: "courses" });
