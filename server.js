import express from "express";
import router from "./routes/index.js";

const app = express();

//middleware di express
// set static folder
app.use(express.static('public'));
// parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));
// parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use('/', router);

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});