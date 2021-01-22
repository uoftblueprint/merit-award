import { Router } from "express";

import {getQuestions, updateQuestions} from "../forms/forms"

const router = Router();

router.get("/questions", getQuestions);

router.get("/updateQuestions", updateQuestions)

export default router;
