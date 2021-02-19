import { NextFunction, Request, Response } from 'express'
import passport from "passport";
import jwt from "jsonwebtoken";

import UserModel from "../../src/models/User";
import { Student, Counselor } from '../models/UserType';
import { User } from "../types";
import { JWT_SECRET } from '../constants';

const reqLogin = async (err: Error, user: User, req: Request, res: Response, next: NextFunction) => {
  try {
    if (err || !user) {
      const error = new Error("An error occurred.");

      return next(error);
    }

    req.login(user, { session: false }, async (error: Error) => {
      if (error) return next(error);

      const body = { _id: user._id, email: user.email };
      const token = jwt.sign({ user: body }, JWT_SECRET);

      return res.json({ access: token });
    });
  } catch (error) {
    return next(error);
  }
}

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
  const doesUserExist = await UserModel.exists({ email: req.body.email });
  if (doesUserExist) {
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

export const signUpCounselor = async (req: Request, res: Response, next: NextFunction) => {
  const user = await UserModel.findOne({ email: req.body.email });
  if (user && user.counselor) {
    res.status(400);
    return res.json({ error: "User is already a counselor" });
  }

  const student = await Student.findOne({ counselorReferral: req.body.url })
  if (!student) {
    res.status(400);
    return res.json({ error: "Invalid Referral Url :(" });
  }

  req.body._student = student;

  passport.authenticate("signupCounselor", async (err: Error, user: User, _: NextFunction) => {
    return reqLogin(err, user, req, res, next);
  })(req, res, next);
  
  student.counselorReferral = null;
  await student.save();
};

export const signUpReviewer = async (req: Request, res: Response, next: NextFunction) => {
  const user = await UserModel.findOne({ email: req.body.email });
  if (user && user.reviewer) {
    res.status(400);
    return res.json({ error: "User is already a reviewer" });
  }

  const student = await Student.findOne({ reviewerReferral: req.body.url })
  if (!student) {
    res.status(400);
    return res.json({ error: "Invalid Referral Url :(" });
  }

  req.body._student = student;
  
  passport.authenticate("signupReviewer", async (err: Error, user: User, _: NextFunction) => {
    return reqLogin(err, user, req, res, next);
  })(req, res, next);

  student.reviewerReferral = null;
  await student.save();
};

export const signUpAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const user = await UserModel.exists({ email: req.body.email });
  if (user) {
    res.status(400);
    return res.json({ error: "User already exists." });
  }

  passport.authenticate("signupAdmin", async (err: Error, user: User, _: NextFunction) => {
    return reqLogin(err, user, req, res, next);
  })(req, res, next);
};

export const getStudentFromCounselorReferral = async (req: Request, res: Response, next: NextFunction) => {
  // referral doesn't work with admin yet -- see studentRoutes.ts
  try {
    console.log("getting student from counselor referral");
    const student = await Student.findOne({counselorReferral: req.params.referral});
    console.log('student :>> ', student);
    if (!student) {
      return res.status(400).json({ error: "Invalid counselor referral link."})
    }
    const user = await UserModel.findById(student.user);
    if (!user) {
      return res.status(500).json({ error: "We couldn't get the user associated with the referral link."})
    }
    console.log('user :>> ', user);
    return res.status(200).json({email: user.email});   // send back email for now because we don't have names
  }
  catch (err) {
    return next(err);
  }
}
