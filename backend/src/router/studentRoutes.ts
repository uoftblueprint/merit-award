import { NextFunction, Request, Response, Router } from 'express';
import { User } from '../types';
import { Student } from '../models/UserType';
import { AppStatus } from '../models/AppStatus';
import crypto from "crypto";

const router = Router();

router.put(
  '/referral/counselor',
  async (req: Request, res: Response, _: NextFunction) => {
    const user = req.user as User;
    console.log(user);
    if (!(user.student || user.admin)) {
      return res.json({error: "Only students and admins can give referral links."})
    }
    const url = crypto.randomBytes(50).toString('hex');
    const student = await Student.findById(user.student);
    student.counselorReferral = url;
    await student.save();

    res.json({url: url})
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

router.get(
  '/app-status',
  async (req: Request, res: Response, _: NextFunction) => {
    const user = req.user as User;
    const student = await Student.findById(user.student);
    const application = await AppStatus.findById(student.applicationId);
    res.json({
      message: 'Retrieving the current status of the application',
      application: application
    })
  }
);

export default router;
