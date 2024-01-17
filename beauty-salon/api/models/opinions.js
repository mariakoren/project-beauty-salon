import mongoose from 'mongoose';

const OpinionsSchema = new mongoose.Schema({
    content:{
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
       
    },
},{timestamps: true})

export default mongoose.model("Opinions", OpinionsSchema);