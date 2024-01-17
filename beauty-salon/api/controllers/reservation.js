import Reservation from "../models/reservstion.js";
import User from "../models/user.js";

export const createReservation = async (req, res) => {
    const newReservation = new Reservation(req.body);
    try {
        const savedReservation = await newReservation.save();
        res.status(200).json(savedReservation)
    } catch(err){
        res.status(500).json(err);
    }
}



export const deleteReservation = async (req, res) => {

    try {
        const deletedReservation = await Reservation.findByIdAndDelete(
            req.params.id
        )



        async () => {
            try {
              await Time.updateOne(
                { "timeNumber._id": deletedReservation.time },
                {
                  $pull: {
                    "timeNumber.$.unavailableDates": deletedReservation.date
                  },
                }
              );
              res.status(200).json("Time status has been updated.");
            } catch (err) {
              next(err);
            }
        res.status(200).json("reservation has been deleted")
        }

    } catch(err){
        res.status(500).json(err);
    }
}

export const getReservation = async (req, res) => {

    try {
        const reservation = await Reservation.findById(
            req.params.id, 
            )

        res.status(200).json(reservation)
    } catch(err){
        res.status(500).json(err);
    }
} 

export const getReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find(req.query)
        res.status(200).json(reservations)
    } catch(err){
        res.status(500).json(err);
    }
}