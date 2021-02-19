import { Router } from 'express';
import { check } from 'express-validator';
import { signUp, logIn, signUpCounselor, signUpReviewer, signUpAdmin, recoverPassword, redirectReset, resetPassword } from "../controllers/auth";



const router = Router();

router.post("/signup", signUp);

router.post("/login", logIn);

router.post("/signup/counselor", signUpCounselor);
router.post("/signup/reviewer", signUpReviewer);
router.post("/signup/admin", signUpAdmin);

router.post("/recover", recoverPassword);
router.get("/reset/:token", redirectReset);
router.post("/reset/:token", [
    check('confirmPassword', 'Passwords do not match').custom((value, { req }) => (value === req.body.password)),
], resetPassword);
export default router;
