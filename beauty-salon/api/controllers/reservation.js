import Reservation from "../models/reservstion.js";
import User from "../models/user.js";
import Service from "../models/service.js";

export const createReservation = async (req, res, next) => {
    const newReservation = new Reservation(req.body);
    try {
        const savedReservation = await newReservation.save();
        res.status(200).json(savedReservation)
    } catch(err){
        // res.status(500).json(err);
        next(err)
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

export const getReservationForPerson = async (req, res) => {
    const userIdParam = req.query.id;
    try {
        const reservations = await Reservation.find({ userId: userIdParam });
        res.status(200).json(reservations);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Błąd podczas przetwarzania zapytania.' });
    }
};
export const getReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find(req.query)
        res.status(200).json(reservations)
    } catch(err){
        res.status(500).json(err);
    }
}

export const getAveragePriceForUser = async (req, res) => {
    const userIdParam = req.query.id;
    try {
        const reservations = await Reservation.find({ userId: userIdParam });
        if (reservations.length === 0) {
            return res.status(404).json({ message: 'Brak rezerwacji dla podanego użytkownika.' });
        }
        let totalPrices = 0;
        for (const reservation of reservations) {
            const serviceId = reservation.serviceId;
            const service = await Service.findOne({ _id: serviceId });
            if (service) {
                totalPrices += service.price;
            }
        }
        const averagePrice = totalPrices / reservations.length;
        res.status(200).json({ averagePrice });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Błąd podczas przetwarzania zapytania.' });
    }
}

