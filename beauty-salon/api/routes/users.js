import express from "express";
import User from "../models/user.js";
import {deleteUser, getUser, getallUser, updatedUser } from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
const router = express.Router();

// router.get("/checkauth", verifyToken, (req, res, next) => {
//     res.send("hello user, you are logged in");
// })

// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//     res.send("hello user, you are logged in and you can delete you account");
// })

// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//     res.send("hello admin, you are logged in and you can delete all accounts");
// })

//UPDATE
router.put("/:id", verifyUser, updatedUser)

//DELETE
router.delete("/:id",verifyUser, deleteUser)

//GET
router.get("/:id",verifyUser, getUser)

//GET ALL
router.get("/", verifyAdmin, getallUser)




export default router;
