import { AppError } from "../utils/appError";
import { Response, Request, NextFunction } from 'express';


export const appErrorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";
  const data = err.data || {};

  // Send error response with status code and message
  res.status(statusCode).json({
    message,
    data,
  });
}
