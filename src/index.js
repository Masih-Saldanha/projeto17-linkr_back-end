import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";

import router from "./routers/index.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(json());

app.use(router);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`API Connected and listening on Port: ${PORT}`)
})