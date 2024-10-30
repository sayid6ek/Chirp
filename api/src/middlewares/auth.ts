import jwt, { JwtPayload } from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import { Request, Response, NextFunction } from "express";
import env from "../utils/validate.env.js";

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

export const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.cookies;
    if (!token) {
      res.status(401);
      throw new Error("Not authorized, No token provided.");
    }

    try {
      const decoded = jwt.verify(token, env.JWT_SECRET as string) as JwtPayload;
      req.userId = decoded.userId;

      const user = await User.findById(req.userId);
      if (!user) {
        res.status(404);
        throw new Error("Not authorized, User not found.");
      }

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, Invalid token.");
    }
  }
);
