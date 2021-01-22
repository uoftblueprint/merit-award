import { Router } from 'express';

import { signUp, logIn, signUpCounselor } from "../controllers/auth";


const router = Router();

router.post("/signup", signUp);

router.post("/login", logIn);

router.post("/create/counselor", signUpCounselor);

export default router;
