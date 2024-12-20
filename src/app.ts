import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { UserRoutes } from './app/modules/user/user.route';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';

const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// /api/v1/students/create-student

// application routes
// app.use('/api/v1/user', UserRoutes);
// app.use('/api/user', UserRoutes);
app.use('/api', router);

// const getAController = (req: Request, res: Response) => {
//   //   res.send('Hello World!')
//   const a = 10;

//   res.send(a);
// };
// app.get('/', getAController);


// Controller for root route
const test = async (req: Request, res: Response) => {
  // Promise.reject();
  res.status(200).send("Success"); // HTTP 200 OK with a message

};

app.get('/', test);

app.use(globalErrorHandler);

// Not Found
app.use(notFound);


// console.log(process.cwd()); // E:\web\Programming Hero\Level 2\Mission 01-Be A Typescript Technocrat\Module 8-Mastering The Core concept of Mongoose\first-project

export default app;
