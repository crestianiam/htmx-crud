import express from "express";
import { sleep } from "./utils.js";

const app = express();

// set static folder
app.use(express.static('public'));
// parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));
// parse JSON bodies (as sent by API clients)
app.use(express.json());

//get request fetch users
app.get("/users", async (req, res) => {
    await sleep(2000);
    const limit = +req.query.limit || 10;
    const response = await fetch(`https://jsonplaceholder.typicode.com/users?_limit=${limit}`);
    const users = await response.json();

    res.send(`
    <h1 class="text-2xl">Users</h1>
    <ul>
        ${users.map((user) => `<li>${user.name}</li>`).join("")}
    </ul>
    `)
})

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});