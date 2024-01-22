"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Todo = exports.User = void 0;
var mongoose = require("mongoose");
var userSchema = new mongoose.Schema({
    username: String,
    password: String,
});
var todoSchema = new mongoose.Schema({
    title: String,
    description: String,
    done: Boolean,
    userId: String,
});
exports.User = mongoose.model('User', userSchema);
exports.Todo = mongoose.model('Todo', todoSchema);
