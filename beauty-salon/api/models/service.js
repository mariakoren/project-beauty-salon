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
    },
    // times: {
    //     type: [String],
    // },
    ratingDetail: {
        type: String,
        enum: ['bardzo polecane', 'polecane', 'nie polecane']
    },
    dates: 
        [{
            times:
                [
                    {
                        title: {
                            type:String
                        },
                        isAvaible: {
                            type: Boolean
                        },
                       
                    }
                ],
            dayTitle: {
                type: String,
           
            }
        }]
})

ServiceSchema.pre('save', function (next) {
    if (this.rating >= 4.5) {
        this.ratingDetail = 'bardzo polecane';
    } else if (this.rating >= 2.0) {
        this.ratingDetail = 'polecane';
    } else {
        this.ratingDetail = 'nie polecane';
    }
    next();
});

export default mongoose.model("Service", ServiceSchema);