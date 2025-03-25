import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import { router } from './src/router';

//For env File 
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to SAPI');
});
app.use("/api", router);

app.listen(port, () => {
  console.log(`SAPI is running on https://localhost:${port}`);
});
