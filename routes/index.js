import path from "path";
import express from "express";
import { sleep } from "../utils.js";
import { uuid } from "uuidv4";
import fs from "fs";
import dotenv from "dotenv";
import { VIEW_TODO_ITEM, VIEW_TODO_EMPTY_LIST, VIEW_FORM_NEW_ITEM, VIEW_ITEM_SECTION, VIEW_FORM_EDIT_ITEM } from "../constants.js";
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
      .replace(/\{\{ todo\.id \}\}/g, todo.id)
      .replace(/\{\{ todo\.name \}\}/g, todo.name)
      .replace(/\{\{ todo\.description \}\}/g, todo.description);
  }).join('');
  const todoEmptyListHTML = fs.readFileSync(path.join(viewsFolderPath, VIEW_TODO_EMPTY_LIST), 'utf8');

  res.send(todos.length > 0 ? `
    <ul>
      ${todoItemsHTML}
    </ul>
  ` :
    todoEmptyListHTML);
})

router.get('/todos/new', (req, res) => {
  const formHTML = fs.readFileSync(path.join(viewsFolderPath, VIEW_FORM_NEW_ITEM), 'utf8');
  res.send(formHTML);
});

router.get('/todos/edit/:id', (req, res) => {
  const { id } = req.params;
  const todos = readTodos();
  const indexOfElement = todos.findIndex((current) => current.id === id);
  //??? verifica index esiste
  const formHTML = fs.readFileSync(path.join(viewsFolderPath, VIEW_FORM_EDIT_ITEM), 'utf8');

  const formHTMLWithValues = formHTML
    .replace(/\{\{ todo\.id \}\}/g, todos[indexOfElement].id)
    .replace(/\{\{ todo\.name \}\}/g, todos[indexOfElement].name)
    .replace(/\{\{ todo\.description \}\}/g, todos[indexOfElement].description);
  res.send(formHTMLWithValues);
});

router.get('/todos/cancel-action', (req, res) => {
  const formHTML = fs.readFileSync(path.join(viewsFolderPath, VIEW_ITEM_SECTION), 'utf8');
  res.send(formHTML);
});

router.post("/todos", (req, res) => {
  const newToDo = req.body;
  newToDo.id = uuid();
  const todos = readTodos();
  todos.push(newToDo);
  saveTodos(todos);

  const todoItemsHTML = todos.map(todo => {
    const todoItemHTML = fs.readFileSync(path.join(viewsFolderPath, VIEW_TODO_ITEM), 'utf8');
    return todoItemHTML
      .replace(/\{\{ todo\.id \}\}/g, todo.id)
      .replace(/\{\{ todo\.name \}\}/g, todo.name)
      .replace(/\{\{ todo\.description \}\}/g, todo.description);
  }).join('');

  const initialButtonHTML = fs.readFileSync(path.join(viewsFolderPath, VIEW_ITEM_SECTION), 'utf8');

  res.send(`
     <ul id="myListContent" hx-swap-oob="true">
      ${todoItemsHTML}
    </ul>
    ${initialButtonHTML}
  `);
})

router.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  const todos = readTodos();
  const indexOfElement = todos.findIndex((current) => current.id === id);
  let newTodos = [...todos];
  if (indexOfElement > -1) {
    newTodos.splice(indexOfElement, 1);
  }
  saveTodos(newTodos);

  const todoItemsHTML = newTodos.map(todo => {
    const todoItemHTML = fs.readFileSync(path.join(viewsFolderPath, VIEW_TODO_ITEM), 'utf8');
    return todoItemHTML
      .replace(/\{\{ todo\.id \}\}/g, todo.id)
      .replace(/\{\{ todo\.name \}\}/g, todo.name)
      .replace(/\{\{ todo\.description \}\}/g, todo.description);
  }).join('');

  res.send(`
     <ul>
       ${todoItemsHTML}
     </ul>
   `);
})

router.put('/todos/:id', (req, res) => {
  const { id } = req.params;
  const todos = readTodos();
  const newTodo = req.body;
  const indexOfElement = todos.findIndex((current) => current.id === id);
  if (indexOfElement > -1) {
    todos[indexOfElement].name = newTodo.name;
    todos[indexOfElement].description = newTodo.description;
  }
  saveTodos(todos);
  const todoItemsHTML = todos.map(todo => {
    const todoItemHTML = fs.readFileSync(path.join(viewsFolderPath, VIEW_TODO_ITEM), 'utf8');
    return todoItemHTML
      .replace(/\{\{ todo\.id \}\}/g, todo.id)
      .replace(/\{\{ todo\.name \}\}/g, todo.name)
      .replace(/\{\{ todo\.description \}\}/g, todo.description);
  }).join('');

  const initialButtonHTML = fs.readFileSync(path.join(viewsFolderPath, VIEW_ITEM_SECTION), 'utf8');

  res.send(`
     <ul id="myListContent" hx-swap-oob="true">
      ${todoItemsHTML}
    </ul>
    ${initialButtonHTML}
  `);
})



export default router;