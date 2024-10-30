import { Request, Response, NextFunction } from "express";

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = "Something went wrong";

  if (err instanceof Error) {
    message = err.message;

    if ((err as any).name === "CastError" && (err as any).kind === "ObjectId") {
      statusCode = 404;
      message = "Resource not found";
    }

    res.status(statusCode).json({
      message,
      stack: err.stack, // change on production
    });
  } else {
    res.status(statusCode).json({
      message,
    });
  }
};
