import { Router } from "express";

import {getQuestions, updateRoute, getPage, postForm } from "../controllers/form"

const router = Router();

//Routes related to querying MongoDB
router.get("/questions", getQuestions)
router.get("/questions/:page", getPage);

//Routes for querying Airtable
router.get("/updateQuestions", updateRoute)

//Routes for post requests
router.post('/response', postForm)

export default router;
