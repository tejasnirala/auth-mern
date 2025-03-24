import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { config } from 'dotenv';
import path from 'path';
import { connection } from './database/connection.js'
import { errorMiddleware } from './middlewares/error.js';
import userRouter from './routes/userRouter.js';
import { removeUnverifiedAccounts } from './auto/removeUnverifiedAccount.js';

config({ path: '.env' });

const __dirname = path.resolve();

export const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api/v1/user', userRouter);

if(process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "dist", "index.html"));
  });
}

removeUnverifiedAccounts();

connection();

app.use(errorMiddleware);
