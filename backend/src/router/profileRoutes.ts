import { AnyARecord } from 'dns';
import { NextFunction, Request, Response, Router } from 'express'
import User from '../models/User';
import { Student } from '../models/UserType';

const router = Router();

router.get(
  '/profile',
  async (req: Request, res: Response, _: NextFunction) => {
    let user = req.user as any;
    let student = await Student.findById(user.student);
    res.json({
      message: 'You made it to the secure route',
      user: user,
      student: student,
      token: req.query.secret_token
    })
  }
);

router.put('/update', async (req: Request, res: Response, _: NextFunction) => {
  const user = req.user as any;
  const data = req.body.data;
  const result = await User.findByIdAndUpdate(user._id, data);
  if ('school' in data) {
    const studentResult = await Student.findByIdAndUpdate(user.student, { school: data['school'] });
    if (!studentResult) {
      return res.status(400).send("Error updating student information");
    }
  }
  if (result) {
    return res.json({ msg: "Successfully updated!", data: result });
  } else {
    return res.status(400).send("Error updating user information.");
  }
});

export default router;
