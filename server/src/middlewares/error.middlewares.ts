import { ErrorRequestHandler, RequestHandler } from 'express';
import { HttpInternal } from '../utils/HttpErrors/HttpInternal';
import { HttpNotFound } from '../utils/HttpErrors/HttpNotFound';

export const notFoundHandler: RequestHandler = (req, _res, next) =>
  next(new HttpNotFound(req.originalUrl));

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  err = err.statusCode ? err : new HttpInternal();

  res.status(err.statusCode).send({
    message: err.toString()
  });
};
