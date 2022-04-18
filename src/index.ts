import express, { json } from 'express';
import "express-async-errors"
import cors from 'cors';
import dotenv from 'dotenv'
import router from './routes/index.js';
import errorHandlingMiddleware from './middlewares/errorHandlingMiddleware.js';

const app = express();

dotenv.config()

app.use(cors());
app.use(json());
app.use(router)
app.use(errorHandlingMiddleware)


app.listen(process.env.PORT || 5000);