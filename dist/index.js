import cors from "cors";
import express, { json } from "express";
import "express-async-errors";
import errorHandler from "./middlewares/errorHandlerMiddleware.js";
import router from "./routers/index.js";
import dotenv from "dotenv";
import dayjs from "dayjs";
import chalk from "chalk";
dotenv.config();
var app = express();
app.use(cors());
app.use(json());
app.use(router);
app.use(errorHandler);
console.log(chalk.red('RAAAAAAAAAAAAAAAAATOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO'), dayjs());
var port = +process.env.PORT || 5000;
app.listen(port, function () {
    console.log("Server up and running on port ".concat(port));
});
