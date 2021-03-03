import { NextFunction, Request, Response, Router } from 'express';
import { User } from '../types';
import { Student } from '../models/UserType';
import crypto from "crypto";
import { inviteRecommender } from "../controllers/student"

const router = Router();

router.post('/recommender/add', inviteRecommender)

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

router.put(
  '/referral/recommender',
  async (req: Request, res: Response, _: NextFunction) => {
    const user = req.user as User;
    if (!(user.student || user.admin)) {
      return res.json({error: "Only students and admins can give referral links."})
    }
    const url = crypto.randomBytes(50).toString('hex');
    const student = await Student.findById(user.student);
    student.recommenderReferral = url;
    await student.save();
    
    res.json({url: url})
  }
);

export default router;
