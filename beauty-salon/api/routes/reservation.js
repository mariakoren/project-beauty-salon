import express from "express";
import { createReservation, deleteReservation, getReservation, getReservations } from "../controllers/reservation.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
const router = express.Router();

//CREATE
router.post("/", createReservation)


//DELETE
router.delete("/:id",verifyUser, deleteReservation)

//GET
router.get("/find/:id", verifyUser, getReservation)
router.get("/find/:id", verifyAdmin, getReservation)

//GET ALL
router.get("/", verifyAdmin, getReservations)




export default router;
