"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var _a = require("../middleware/index"), authenticateJwt = _a.authenticateJwt, SECRET = _a.SECRET;
var Todo = require("../db").Todo;
var router = express.Router();
router.post('/todos', authenticateJwt, function (req, res) {
    var input = req.body;
    var done = false;
    var userId = req.headers["userID"];
    var newTodo = new Todo({ title: input.title, description: input.description, done: done, userId: userId });
    newTodo.save()
        .then(function (savedTodo) {
        res.status(201).json(savedTodo);
    })
        .catch(function (err) {
        res.status(500).json({ error: 'Failed to create a new todo' });
    });
});
router.get('/todos', authenticateJwt, function (req, res) {
    var userId = req.headers["userId"];
    Todo.find({ userId: userId })
        .then(function (todos) {
        res.json(todos);
    })
        .catch(function (err) {
        res.status(500).json({ error: 'Failed to retrieve todos' });
    });
});
router.patch('/todos/:todoId/done', authenticateJwt, function (req, res) {
    var todoId = req.params.todoId;
    var userId = req.headers["userId"];
    Todo.findOneAndUpdate({ _id: todoId, userId: userId }, { done: true }, { new: true })
        .then(function (updatedTodo) {
        if (!updatedTodo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        res.json(updatedTodo);
    })
        .catch(function (err) {
        res.status(500).json({ error: 'Failed to update todo' });
    });
});
exports.default = router;
