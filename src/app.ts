import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { UserRoutes } from './app/modules/user/user.route';

const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// /api/v1/students/create-student

// application routes
// app.use('/api/v1/user', UserRoutes);
app.use('/api/user', UserRoutes);

const getAController = (req: Request, res: Response) => {
  //   res.send('Hello World!')
  const a = 10;

  res.send(a);
};

app.get('/', getAController);

// console.log(process.cwd()); // E:\web\Programming Hero\Level 2\Mission 01-Be A Typescript Technocrat\Module 8-Mastering The Core concept of Mongoose\first-project

export default app;
