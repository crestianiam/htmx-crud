import path from "path";
import express from "express";
import { sleep } from "../utils.js";
import { uuid } from "uuidv4";
import fs from "fs";
import dotenv from "dotenv";
import { VIEW_TODO_ITEM, VIEW_TODO_EMPTY_LIST } from "../constants.js";
import { readTodos, saveTodos } from "../persistance/readAndWrite.js";

dotenv.config();
const router = express.Router();

const viewsFolderPath = process.env.VIEWS_FOLDER_PATH;

router.get("/todos", async (req, res) => {
  await sleep("500")
  const todos = readTodos();

  const todoItemsHTML = todos.map(todo => {
    const todoItemHTML = fs.readFileSync(path.join(viewsFolderPath, VIEW_TODO_ITEM), 'utf8');
    return todoItemHTML
      .replace(/\{\{ todo\.name \}\}/g, todo.name)
      .replace(/\{\{ todo\.description \}\}/g, todo.description)
      .replace(/\{\{ todo\.id \}\}/g, todo.id);
  }).join('');
  const todoEmptyListHTML = fs.readFileSync(path.join(viewsFolderPath, VIEW_TODO_EMPTY_LIST), 'utf8');

  res.send(todos.length > 0 ? `
    <ul>
      ${todoItemsHTML}
    </ul>
  ` :
    todoEmptyListHTML);
})

router.get('/todos/:id', (req, res) => {
  const { id } = req.params;
  const todos = readTodos();
  const todo = todos.find((todo) => todo.id === Number(id));

  res.send(`
    <h2>${todo.name}</h2>
    <p><strong>Name:</strong> ${todo.name}</p>
    <p><strong>Description:</strong> ${todo.description}</p>
  `);
});

router.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  const todos = readTodos();
  console.log(todos)
  const indexOfElement = todos.findIndex((current) => current.id === id);
  let newTodos = [...todos];
  if (indexOfElement !== 1) {
    newTodos.splice(indexOfElement, 1);
  }
  saveTodos(newTodos);

  const todoItemsHTML = newTodos.map(todo => {
    const todoItemHTML = fs.readFileSync(path.join(viewsFolderPath, VIEW_TODO_ITEM), 'utf8');
    return todoItemHTML
      .replace('{{ todo.name }}', todo.name)
      .replace('{{ todo.description }}', todo.description)
      .replace('{{ todo.id }}', todo.id);
  }).join('');

  res.send(`
     <ul>
       ${todoItemsHTML}
     </ul>
   `);
})

router.post("/todos", (req, res) => {
  const newToDo = req.body;
  newToDo.id = uuid();
  const todos = readTodos();
  todos.push(newToDo);
  saveTodos(todos);

  const todoItemsHTML = todos.map(todo => {
    const todoItemHTML = fs.readFileSync(path.join(viewsFolderPath, VIEW_TODO_ITEM), 'utf8');
    return todoItemHTML
      .replace('{{ todo.name }}', todo.name)
      .replace('{{ todo.description }}', todo.description)
      .replace('{{ todo.id }}', todo.id);
  }).join('');

  res.send(`
    <ul>
      ${todoItemsHTML}
    </ul>
  `);
})



export default router;