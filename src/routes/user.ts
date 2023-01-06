import express from "express";
import * as userController from "../controller/user";

const router = express.Router();

router.post("/signup", userController.user_signup);

export default router;
