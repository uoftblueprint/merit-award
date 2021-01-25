import { Router } from 'express';

import { signUp, logIn, signUpCounselor, signUpReviewer, signUpAdmin, recoverPassword, redirectReset } from "../controllers/auth";



const router = Router();

router.post("/signup", signUp);

router.post("/login", logIn);

router.post("/signup/counselor", signUpCounselor);
router.post("/signup/reviewer", signUpReviewer);
router.post("/signup/admin", signUpAdmin);

router.post("recover", recoverPassword);
router.get("reset", redirectReset);
export default router;
