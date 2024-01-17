import express from "express";
import { createService, deleteService, getService, getallService, updatedService, countByType, getServiceTimes, getFilteredServices } from "../controllers/service.js";
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
router.get("/search", getFilteredServices)

//GET BY TYPE
router.get("/countByType", countByType)



router.get("/time/:id", getServiceTimes )




export default router;
