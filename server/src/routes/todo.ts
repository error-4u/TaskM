const express = require('express');
const { authenticateJwt, SECRET } = require("../middleware/index");
const { Todo } = require("../db");
import { Response,Request, NextFunction } from 'express';
const router = express.Router();

interface CreateTodoInput{
  title: string;
  description: string;
}

router.post('/todos', authenticateJwt, (req:Request, res:Response) => {
  const input: CreateTodoInput = req.body;
  const done = false;
  const userId = req.headers["userID"];

  const newTodo = new Todo({ title: input.title, description: input.description, done, userId });

  newTodo.save()
    .then((savedTodo: any) => {
      res.status(201).json(savedTodo);
    })
    .catch((err: any) => {
      res.status(500).json({ error: 'Failed to create a new todo' });
    });
});


router.get('/todos', authenticateJwt, (req: Request, res:Response) => {
  const userId = req.headers["userId"];

  Todo.find({ userId })
    .then((todos: any) => {
      res.json(todos);
    })
    .catch((err: any) => {
      res.status(500).json({ error: 'Failed to retrieve todos' });
    });
});

router.patch('/todos/:todoId/done', authenticateJwt, (req:Request, res: Response) => {
  const { todoId } = req.params;
  const userId = req.headers["userId"];

  Todo.findOneAndUpdate({ _id: todoId, userId }, { done: true }, { new: true })
    .then((updatedTodo: CreateTodoInput) => {
      if (!updatedTodo) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      res.json(updatedTodo);
    })
    .catch((err: any) => {
      res.status(500).json({ error: 'Failed to update todo' });
    });
});

export default router;