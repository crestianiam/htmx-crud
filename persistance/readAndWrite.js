import { readJSONFromFile, writeJSONToFile } from "../utils.js";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const todosFilePath = path.join(process.env.DATA_FOLDER_PATH, process.env.DATA_FILE);

export const readTodos = () => {
    const todos = readJSONFromFile(todosFilePath);
    return todos;
}

export const saveTodos = (todos) => {
    writeJSONToFile(todos, todosFilePath);
}