import express from 'express';
import morgan from 'morgan';
import indexRouter from './routes/routes.index';
import {main} from './excelReporting/excelReport'

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(indexRouter);
app.set('port','3000');
main()

export default app;