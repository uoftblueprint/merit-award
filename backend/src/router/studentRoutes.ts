import { NextFunction, Request, Response, Router } from 'express';
import { User } from '../types';
import { Student } from '../models/UserType';
import crypto from "crypto";

const router = Router();

router.put(
  '/referral/counselor',
  async (req: Request, res: Response, _: NextFunction) => {
    const user = req.user as User;
    if (!(user.student || user.admin)) {
      return res.json({error: "Only students and admins can give referral links."})
    }
    const referral = crypto.randomBytes(50).toString('hex');
    const student = await Student.findById(user.student);
    student.counselorReferral = referral;
    await student.save();
    console.log("making referral link");
    console.log('user :>> ', user);
    console.log('student :>> ', student);
    res.json({url: "http://localhost:3000/signup/counselor/" + referral})
  }
);

router.put(
  '/referral/reviewer',
  async (req: Request, res: Response, _: NextFunction) => {
    const user = req.user as User;
    if (!(user.student || user.admin)) {
      return res.json({error: "Only students and admins can give referral links."})
    }
    const url = crypto.randomBytes(50).toString('hex');
    const student = await Student.findById(user.student);
    student.reviewerReferral = url;
    await student.save();
    
    res.json({url: url})
  }
);

export default router;
