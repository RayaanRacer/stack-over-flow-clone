import express from "express";
import { signup, login } from "../controllers/auth.js";
import { getAllUser, updateProfile } from "../controllers/users.js"
import auth from "../middleWare/auth.js";
const router = express.Router();

router.post("/Signup", signup);
router.post("/Login", login);

router.get("/GetAllUsers", getAllUser)
router.patch("/UpdateUser/:id", updateProfile)

export default router;
