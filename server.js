import express from "express";
import { sleep } from "./utils.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from 'url';

const app = express();
// set static folder
app.use(express.static('public'));
// parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));
// parse JSON bodies (as sent by API clients)
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const todosFilePath = path.join(__dirname, 'data', 'todos.json');

const readData = (filePath) => {
    if (!fs.existsSync(filePath)) {
        return [];
    }
    const data = fs.readFileSync(filePath, 'utf8');
    if (!data) {
        return [];
    }
    return JSON.parse(data);
};

const writeData = (data, filePath) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

app.get("/todos", async (req, res) => {
    await sleep("500")
    const todos = readData(todosFilePath);
    res.send(`
        <ul>
          ${todos.map((todo) => `<li>${todo.name} - ${todo.description}</li>`).join('')}
        </ul>
      `);
})
app.post("/todos", (req, res) => {
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

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});