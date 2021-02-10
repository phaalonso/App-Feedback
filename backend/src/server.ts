import express from 'express';
import * as dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';

import 'express-async-errors';
import errorHandler from './errors/handler';
import router from './routes';

import './database/connection';

const pathToImages = path.join(__dirname, '..', 'static', 'images');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(pathToImages));

app.use(router);

app.use(errorHandler);

app.listen(3333, () => {
    console.log('Server is online');
});
