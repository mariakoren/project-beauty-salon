import express from "express";
import Service from "../models/service.js";
import { createService, deleteService, getService, getallService, updatedService, countByType } from "../controllers/service.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
const router = express.Router();

//CREATE
router.post("/",verifyAdmin, createService)

//UPDATE
router.put("/:id", verifyAdmin, updatedService)

//DELETE
router.delete("/:id",verifyUser, deleteService)

//GET
router.get("/find/:id", getService)

//GET ALL
router.get("/", getallService)

//GET BY TYPE
router.get("/countByType", countByType)




export default router;
