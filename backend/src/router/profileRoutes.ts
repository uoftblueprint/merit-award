import { NextFunction, Request, Response, Router } from 'express'

const router = Router();

router.get(
  '/profile',
  (req: Request, res: Response, _: NextFunction) => {
    res.json({
      message: 'You made it to the secure route',
      user: req.user,
      token: req.query.secret_token
    })
  }
);

export default router;
