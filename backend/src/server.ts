import express from 'express';

import './database/connection';
import router from './routes';
import path from 'path';

const pathToImages = path.join(__dirname, '..', 'static', 'images');

const app = express();

app.use(express.json());

app.use('/uploads', express.static(pathToImages));

app.use(router);

app.listen(3333, () => {
    console.log('Server is online');
});