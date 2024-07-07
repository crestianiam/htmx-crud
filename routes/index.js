import path from "path";
import { fileURLToPath } from 'url';
import express from "express";
import { sleep, readData, writeData } from "../utils.js";
import { uuid } from "uuidv4";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const todosFilePath = path.join(__dirname, '..', 'data', 'todos.json');

router.get("/todos", async (req, res) => {
  await sleep("500")
  const todos = readData(todosFilePath);
  res.send(`
        <ul>
          ${todos.map((todo) => `
            <li class="flex items-center justify-between">
            <p class="cursor-pointer underline">${todo.name} - ${todo.description}</p>
            <div>
            <button class="bg-blue-500 text-white py-2 px-2 rounded-lg mt-2">
              edit 
            </button>
            <button class="bg-red-500 text-white py-2 px-2 rounded-lg mt-2">
              delete 
            </button>
            </div>
            </li>
            `).join('')}
        </ul>
      `);
})

router.get('/todos/:id', (req, res) => {
  const { id } = req.params;
  const todos = readData(todosFilePath);
  const todo = todos.find((todo) => todo.id === Number(id));

  res.send(`
    <h2>${todo.name}</h2>
    <p><strong>Name:</strong> ${todo.name}</p>
    <p><strong>Description:</strong> ${todo.description}</p>
  `);
});

router.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  const todos = readData(todosFilePath);
})

router.post("/todos", (req, res) => {
  const newToDo = req.body;
  newToDo.id = uuid();
  const todos = readData(todosFilePath);
  todos.push(newToDo);
  writeData(todos, todosFilePath);
  res.send(`
        <ul>
          ${todos.map((todo) => `
            <li class="flex items-center justify-between">
            <p class="cursor-pointer underline">${todo.name} - ${todo.description}</p>
            <div>
            <button class="bg-blue-500 text-white py-2 px-2 rounded-lg mt-2">
              edit 
            </button>
            <button class="bg-red-500 text-white py-2 px-2 rounded-lg mt-2">
              delete 
            </button>
            </div>
            </li>
            `).join('')}
        </ul>
      `);
})



export default router;