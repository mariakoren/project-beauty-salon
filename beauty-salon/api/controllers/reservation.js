import Reservation from "../models/reservstion.js";
import User from "../models/user.js";
import Service from "../models/service.js";
import mongoose from 'mongoose';

// export const createReservation = async (req, res, next) => {
//     const newReservation = new Reservation(req.body);
//     try {
//         const savedReservation = await newReservation.save();
//         res.status(200).json(savedReservation)
//     } catch(err){
//         // res.status(500).json(err);
//         next(err)
//     }
// }

export const createReservation = async (req, res, next) => {
    const newReservation = new Reservation(req.body);
    try {
        const savedReservation = await newReservation.save();
        const { userId, serviceId, dateTime: { dateTitle, timeTitle } } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send("User not found.");
        }
        const service = await Service.findOne({
            _id: serviceId,
            'dates.dayTitle': dateTitle,
            'dates.times.title': timeTitle
        });
        if (!service) {
            return res.status(404).send("Service not found");
        }
        const timeSlot = service.dates.find(date => date.dayTitle === dateTitle)
                                       .times.find(time => time.title === timeTitle);
        if (!timeSlot.isAvaible) {
            return res.status(400).send("The slot is already reserved.");
        }
        const updatedService = await Service.findOneAndUpdate(
            { _id: serviceId, 'dates.dayTitle': dateTitle, 'dates.times.title': timeTitle },
            { $set: { 'dates.$.times.$[elem].isAvaible': false } },
            { arrayFilters: [{ 'elem.title': timeTitle }] }
        );
        if (!updatedService) {
            return res.status(404).send("Service not found");
        }

        res.status(200).json(savedReservation);
    } catch (err) {
        next(err);
    }
};



// export const deleteReservation = async (req, res) => {
//     try {
//         const deletedReservation = await Reservation.findByIdAndDelete(
//             req.params.id
//         )
//         async () => {
//             try {
//               await Time.updateOne(
//                 { "timeNumber._id": deletedReservation.time },
//                 {
//                   $pull: {
//                     "timeNumber.$.unavailableDates": deletedReservation.date
//                   },
//                 }
//               );
//               res.status(200).json("Time status has been updated.");
//             } catch (err) {
//               next(err);
//             }
//         res.status(200).json("reservation has been deleted")
//         }

//     } catch(err){
//         res.status(500).json(err);
//     }
// }

export const getReservationForPerson = (req, res) => {
    const userIdParam = req.query.id;
    if (!mongoose.Types.ObjectId.isValid(userIdParam)) {
        return res.status(400).json({ message: 'Invalid user ID format.' });
    }

    User.findById(userIdParam)
        .then((user) => {
            if (!user) {
                return res.status(404).json({ message: 'Nie istnieje użytkownik o podanym ID.' });
            }

            return Reservation.find({ userId: userIdParam });
        })
        .then((reservations) => {
            if (reservations.length === 0) {
                return res.status(404).json({ message: 'W tej chwili nie masz żadnych rezerwacji.' });
            }
            res.status(200).json(reservations);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: 'Błąd podczas przetwarzania zapytania.' });
        });
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
    if (!userIdParam){
        return res.status(404).json({message: "użytkownik nie został podany"})
    }
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


export const confirmedReservation = async (req, res) => {
    try {
        const reservationId = req.params.id;
        const updatedReservation = await Reservation.findByIdAndUpdate(
            reservationId,
            { $set: { status: 'confirmed' } },
            { new: true }
        );
        if (!updatedReservation) {
            return res.status(404).json({ error: 'Reservation not found' });
        }
        res.status(200).json(updatedReservation);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteReservation = async (req, res) => {
    try {
        const reservationId = req.params.id;
        const reservationToDelete = await Reservation.findById(reservationId);

        if (!reservationToDelete) {
            return res.status(404).json({ error: 'Reservation not found' });
        }

        if (reservationToDelete.status === 'confirmed') {
            return res.status(400).json({ error: 'Reservation is already confirmed. Deletion is not allowed.' });
        }

        const deletedReservation = await Reservation.findByIdAndDelete(reservationId);

        if (!deletedReservation) {
            return res.status(404).json({ error: 'Reservation not found' });
        }

        const { serviceId, dateTime } = deletedReservation;
        const updatedService = await Service.findOneAndUpdate(
            { _id: serviceId, 'dates.dayTitle': dateTime.dateTitle, 'dates.times.title': dateTime.timeTitle },
            { $set: { 'dates.$[dateElem].times.$[timeElem].isAvaible': true } },
            { arrayFilters: [{ 'dateElem.dayTitle': dateTime.dateTitle }, { 'timeElem.title': dateTime.timeTitle }], new: true }
        );

        if (!updatedService) {
            return res.status(404).json({ error: 'Service or date/time not found in the service' });
        }

        res.status(200).json({ message: 'Reservation deleted and service updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


export const deleteReservationByAdmin = async (req, res) => {
    try {
        const reservationId = req.params.id;
        const reservationToDelete = await Reservation.findById(reservationId);
        if (!reservationToDelete) {
            return res.status(404).json({ error: 'Reservation not found' });
        }
        const deletedReservation = await Reservation.findByIdAndDelete(reservationId);
        if (!deletedReservation) {
            return res.status(404).json({ error: 'Reservation not found' });
        }
        const { serviceId, dateTime } = deletedReservation;
        const updatedService = await Service.findOneAndUpdate(
            { _id: serviceId, 'dates.dayTitle': dateTime.dateTitle, 'dates.times.title': dateTime.timeTitle },
            { $set: { 'dates.$[dateElem].times.$[timeElem].isAvaible': true } },
            { arrayFilters: [{ 'dateElem.dayTitle': dateTime.dateTitle }, { 'timeElem.title': dateTime.timeTitle }], new: true }
        );
        if (!updatedService) {
            return res.status(404).json({ error: 'Service or date/time not found in the service' });
        }
        res.status(200).json({ message: 'Reservation deleted and service updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
