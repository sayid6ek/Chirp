import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import User from "../models/user.model.js";
import generateToken from "../utils/generate.token.js";

export const signup = asyncHandler(async (req: Request, res: Response) => {
  const { name, username, email, password } = req.body;

  const emailExists = await User.findOne({ email });
  if (emailExists) {
    res.status(400);
    throw new Error("Email already in use.");
  }

  const usernameExists = await User.findOne({ username });
  if (usernameExists) {
    res.status(400);
    throw new Error("Username already in use.");
  }

  const user = await User.create({
    name,
    username,
    email,
    password,
  });

  if (!user) {
    res.status(400);
    throw new Error("Invalid user data.");
  }

  generateToken(user._id.toString(), res);
  res.status(201).json({
    _id: user._id,
    name: user.name,
    username: user.username,
    avatar: user.avatar,
  });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { usernameOrEmail, password } = req.body;

  const user = await User.findOne({
    $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
  });

  if (user && (await user.matchPassword(password))) {
    generateToken(user._id.toString(), res);
    res.json({
      _id: user._id,
      name: user.name,
      username: user.username,
      avatar: user.avatar,
    });
  } else {
    res.status(401);
    throw new Error("Invalid credentials.");
  }
});

export const logout = async (req: Request, res: Response) => {
  res.cookie("token", "", { maxAge: 0 });
  res.status(200).json({ message: "Logged out successfully" });
};
