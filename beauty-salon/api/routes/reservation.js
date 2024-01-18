import express from "express";
import { createReservation, deleteReservation, getAveragePriceForUser, getReservationForPerson, getReservations } from "../controllers/reservation.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
const router = express.Router();

//CREATE
router.post("/", createReservation)


//DELETE
router.delete("/:id",verifyUser, deleteReservation)

//GET
router.get("/find", getReservationForPerson)
router.get("/average", verifyAdmin, getAveragePriceForUser)
//GET ALL
router.get("/", verifyAdmin, getReservations)




export default router;
