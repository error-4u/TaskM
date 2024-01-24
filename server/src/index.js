"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose_1 = __importDefault(require("mongoose"));
const port = 3000;
const auth_1 = __importDefault(require("./routes/auth"));
const todo_1 = __importDefault(require("./routes/todo"));
const cors = require("cors");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth", auth_1.default);
app.use("/todo", todo_1.default);
const dbkey = process.env.DB_KEY;
// if(!dbkey){
//     console.error("db key is not defined ")
// }
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
mongoose_1.default.connect(dbkey, { dbName: "courses" });
