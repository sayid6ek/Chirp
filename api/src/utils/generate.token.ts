import jwt from "jsonwebtoken";
import env from "./validate.env.js";
import { Response } from "express";

const generateToken = (userId: string, res: Response) => {
  const token = jwt.sign({ userId }, env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.cookie("token", token, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: false, // change on production
  });
};

export default generateToken;
