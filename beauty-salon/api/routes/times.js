import express from "express";
import {
  createTime,
  deleteTime,
  getTime,
  getTimes,
  removeTimeAvailability,
  updateTime,
  updateTimeAvailability,
} from "../controllers/time.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();
//CREATE
router.post("/:serviceid", verifyAdmin, createTime);

//UPDATE
router.put("/availability/:id", updateTimeAvailability);
router.put("/:id", verifyAdmin, updateTime);
router.put("/remove-availability/:id", removeTimeAvailability);
//DELETE
router.delete("/:id/:serviceid", verifyAdmin, deleteTime);
//GET

router.get("/:id", getTime);
//GET ALL

router.get("/", getTimes);

export default router;