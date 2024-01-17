import express from "express";
import {createOpinion, getOpinions } from "../controllers/opinions.js";
const router = express.Router();

//CREATE
router.post("/", createOpinion)

//GET ALL
router.get("/", getOpinions)

export default router;
