import { NextFunction, Request, Response, Router } from 'express';
import { User } from '../types';
import { Student } from '../models/UserType';
import crypto from "crypto";

const router = Router();

router.put(
  '/referral/counselor',
  async (req: Request, res: Response, _: NextFunction) => {
    const user = req.user as User;
    if (!user.student || !user.admin) {
      return;
    }
    const url = crypto.randomBytes(50).toString('hex');
    const student = await Student.findById(user.student);
    student.counselorReferral = url;
    await student.save();
    
    res.json({url: url})
  }
);

export default router;
