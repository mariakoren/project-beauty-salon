import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import servicesRoute from "./routes/services.js";
import usersRoute from "./routes/users.js";
import timesRoute from "./routes/times.js";
import reserveRoute from "./routes/reservation.js";
import opinionRoute from "./routes/opinions.js";
import cookieParser from "cookie-parser";
import cors from 'cors';

const app = express();
dotenv.config()

const connect = async  () => {
    try{
        await mongoose.connect(process.env.MONGO);
        console.log("connected to mongoDB")
    } catch (error) {
        throw error
    }
}

mongoose.connection.on("disconnected", ()=>{
    console.log("mongoDB disconnected")
})

//middlewares
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(cookieParser())
app.use(express.json())
app.use("/api/auth", authRoute);
app.use("/api/services", servicesRoute);
app.use("/api/users", usersRoute);
app.use("/api/times", timesRoute );
app.use("/api/reservation", reserveRoute);
app.use("/api/opinions", opinionRoute);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "something went wrong";
    return res.status(errorStatus).json(errorMessage)
})


app.listen(8800, ()=>{
    connect();
    console.log("connected to backend")
})