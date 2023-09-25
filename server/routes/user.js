import express from "express";
import { updateUser } from "../controllers/user.js";
import { verify } from "../verify.js";
const router = express.Router();

//update a user
router.put('/:id', verify, updateUser)

//get a user

//delete a user

//like a video

//unlike a video

//subscribe a user

//unsubscribe a user

export default router;