import express from "express";
import router from "./routes/index.js";
import { init } from "./persistance/index.js";
import dotenv from "dotenv";

dotenv.config();

//init file used for storing data
init(process.env.DATA_FOLDER_PATH, process.env.DATA_FILE);

const PORT = process.env.PORT;
const app = express();
//middleware di express
// set static folder
app.use(express.static('public'));
// parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));
// parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use('/', router);


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});