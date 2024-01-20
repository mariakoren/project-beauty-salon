import express from "express";
import { createReservation, getAveragePriceForUser, getReservationForPerson, getReservations, confirmedReservation, deleteReservation, deleteReservationByAdmin } from "../controllers/reservation.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
const router = express.Router();

//CREATE
router.post("/", createReservation)


//DELETE
// router.delete("/:id",verifyUser, deleteReservation)
router.delete("/:id",  deleteReservation)
router.delete("/admin/:id", verifyAdmin, deleteReservationByAdmin)
//GET
router.get("/find", getReservationForPerson)
router.get("/average", verifyAdmin, getAveragePriceForUser)
//GET ALL
router.get("/", verifyAdmin, getReservations)

router.put('/:id/confirm', confirmedReservation);




export default router;
