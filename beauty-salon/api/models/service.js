import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    type: {
        type: String, 
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 5
    },
    price: {
        type: Number,
        required: true
    },
    photos:{
        type: [String],
    },
    address:{
        type:String,
        required: true
    },
    fullDesc:{
        type:String,
        required: true
    }

})

export default mongoose.model("Service", ServiceSchema);