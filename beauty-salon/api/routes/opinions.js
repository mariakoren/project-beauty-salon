import express from "express";
import {createOpinion, getOpinions, sortOpinions } from "../controllers/opinions.js";
const router = express.Router();

//CREATE
router.post("/", createOpinion)

//GET ALL
router.get("/", getOpinions)

router.get("/sorted", sortOpinions)

export default router;
