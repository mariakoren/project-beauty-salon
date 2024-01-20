import mongoose from 'mongoose';

const ReservationSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true,
    },
    serviceId:{
        type: String,
        required: true,
    },
    dateTime: {
        type: {
            dateTitle: String,
            timeTitle: String
        },
        required: true
    }

},{timestamps: true})

export default mongoose.model("Reservation", ReservationSchema);