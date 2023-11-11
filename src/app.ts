import express from 'express';
import { router } from './routes';

const app = express();

app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('json spaces', 2);

app.use('/api', router);

export { app };
