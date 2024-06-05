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
const filePath = path.join(__dirname, 'data', 'events.json');

const readData = () => {
    if (!fs.existsSync(filePath)) {
        return [];
    }
    const data = fs.readFileSync(filePath, 'utf8');
    if (!data) {
        return [];
    }
    return JSON.parse(data);
};

const writeData = (data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

console.error(readData())

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});