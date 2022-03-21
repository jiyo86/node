import mongoose from "mongoose";
import User, { IUser } from "../model/usermodel";
import { body, validationResult } from "express-validator/check";
import { Request, Response, NextFunction } from "express";

mongoose.connect("mongodb://db:27017/usersdb", {});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function () {
  console.log("Connected Successfully");
});

export const userlist = async (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find({});
    resp.send(users);
  } catch (error) {
    resp.status(500).send(error);
  }
};

const adduser = async (req: Request, resp: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      resp.status(422).json({ errors: errors.array() });
      return;
    }
    const data: IUser = req.body;
    const user = new User(data);

    await user.save();
    resp.send(user);
  } catch (error) {
    resp.status(500).send(error);
  }
};

const validate = () => {
  //switch (method) {
  //case "createUser": {
  return [
    body("firstname").exists().isAlpha().isLength({ max: 20 }),
    body("lastname").exists().isAlpha().isLength({ max: 20 }),
    body("email").exists().isEmail(),
  ];
  //}
  //}
};

export default {
  validate,
  adduser,
  userlist,
};
