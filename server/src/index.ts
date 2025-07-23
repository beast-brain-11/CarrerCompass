import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import usersRouter from './api/users';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/users', usersRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
