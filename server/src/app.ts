import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import indexRouter from './routes/index.routes';
import { errorHandler, notFoundHandler } from './middlewares/error.middlewares';

const app = express();

app.use(helmet());
app.use(cors());
app.use(cookieParser(process.env['COOKIE_SECRET'] ?? 'Tungsten Cat'));
app.use(express.json());

const PORT = process.env['PORT'] ?? 8080;
app.listen(PORT, () => console.log(`Listening at PORT ${PORT}`));

app.get('/', (_req, res) => {
  res.send({
    message: 'Hello, World!',
  });
});

app.use(indexRouter);
app.use(notFoundHandler);
app.use(errorHandler);
