import { Router } from "express";

import {processQuestions, createPage} from "../forms/forms"

const router = Router();

router.get("/questions", processQuestions);

router.get("/testCreate", createPage)

export default router;
