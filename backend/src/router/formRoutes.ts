import { Router } from "express";

import {questions, createPage} from "../forms/forms"

const router = Router();

router.get("/questions", questions);

router.get("/testCreate", createPage)

export default router;
