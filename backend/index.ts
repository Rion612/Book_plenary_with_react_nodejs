import express, { Express, Request, Response } from "express";
import * as path from 'path';
import * as bodyparser from 'body-parser';
import cors from 'cors';
import dotenv from "dotenv";
import basicRouter from "./src/routes/auth";
import categoryRouter from "./src/routes/categories";
import bookRouter from "./src/routes/book";

dotenv.config();

const app: Express = express();


app.use(cors());
app.use(bodyparser.json({ limit: '50mb'}))
app.use(bodyparser.urlencoded({ extended: true, limit: '50mb' }));

app.use('/users',basicRouter);
app.use('/',categoryRouter);
app.use('/',bookRouter);

app.listen(process.env.PORT,()=>{
    console.log(`Server is running at port ${process.env.PORT}`)
})
