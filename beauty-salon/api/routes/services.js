import express from "express";
import Service from "../models/service.js";
import { createService, deleteService, getService, getallService, updatedService } from "../controllers/service.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
const router = express.Router();

//CREATE
router.post("/",verifyAdmin, createService)

//UPDATE
router.put("/:id", verifyAdmin, updatedService)

//DELETE
router.delete("/:id",verifyUser, deleteService)

//GET
router.get("/:id", getService)

//GET ALL
router.get("/", getallService)




export default router;
