import mongoose from "mongoose";
const TimeSchema = new mongoose.Schema(
  { title: {type: String, required: true},
    timeNumber: [{ number: {type: String}, 
      unavailableDates: {type: [Date]}
    }
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Time", TimeSchema);