"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var mongoose_1 = require("mongoose");
var port = 3000;
var auth_1 = require("./routes/auth");
var todo_1 = require("./routes/todo");
var cors = require("cors");
var app = express();
app.use(cors());
app.use(express.json());
app.use("/auth", auth_1.default);
app.use("/todo", todo_1.default);
app.listen(port, function () {
    console.log("Example app listening at http://localhost:".concat(port));
});
mongoose_1.default.connect('mongodb+srv://vishal:LXqSJK2wRfTsSjga@cluster0.wa3uqwh.mongodb.net/', { dbName: "courses" });
