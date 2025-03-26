import express, { Application } from 'express';
import dotenv from 'dotenv';
import { router as MainRouter } from './src/routers/router';
import { router as ApiRouter } from './src/routers/apiRouter';
import {appErrorHandler} from './src/middleware/appErrorMiddleware';

//For env File 
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use("/", MainRouter);
app.use("/api", ApiRouter);
app.use(appErrorHandler);

app.listen(port, () => {
  console.log(`SAPI is running on https://localhost:${port}`);
});
