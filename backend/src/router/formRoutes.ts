import { Router } from "express";

import {questions} from "../forms/forms"

const router = Router();

router.get("/questions", questions);

export default router;
