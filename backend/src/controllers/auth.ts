import { NextFunction, Request, Response } from 'express'
import passport from "passport";
import jwt from "jsonwebtoken";

import UserModel from "../../src/models/User";
import { User } from "../types";

const reqLogin = async (err: Error, user: User, req: Request, res: Response, next: NextFunction) => {
  try {
    if (err || !user) {
      console.log(err);
      const error = new Error("An error occurred.");

      return next(error);
    }

    req.login(user, { session: false }, async (error: Error) => {
      if (error) return next(error);

      const body = { _id: user._id, email: user.email };
      const token = jwt.sign({ user: body }, "TOP_SECRET");

      return res.json({ token });
    });
  } catch (error) {
    return next(error);
  }
}

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
  const doesUserExit = await UserModel.exists({ email: req.body.email });
  if (doesUserExit) {
    res.status(400);
    return res.json({ error: "User exists" });
  }
  passport.authenticate("signup", async (err: Error, user: User, _: NextFunction) => {
    return reqLogin(err, user, req, res, next);
  })(req, res, next);
};


export const logIn = async (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("login", async (err: Error, user: User, _: NextFunction) => {
    return reqLogin(err, user, req, res, next);
  })(req, res, next);
};

