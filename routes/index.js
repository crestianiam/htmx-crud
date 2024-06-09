import path from "path";
import { fileURLToPath } from 'url';
import express from "express";
import { sleep, readData, writeData } from "../utils.js";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname)
const todosFilePath = path.join(__dirname, '..', 'data', 'todos.json');

router.get("/todos", async (req, res) => {
    await sleep("500")
    const todos = readData(todosFilePath);
    res.send(`
        <ul>
          ${todos.map((todo) => `<li>${todo.name} - ${todo.description}</li>`).join('')}
        </ul>
      `);
})
router.post("/todos", (req, res) => {
    const todo = req.body;
    console.log(req.body)
    const todos = readData(todosFilePath);
    todos.push(todo);
    writeData(todos, todosFilePath);
    res.send(`
        <ul>
          ${todos.map((todo) => `<li>${todo.name} - ${todo.description}</li>`).join('')}
        </ul>
      `);
})

export default router;