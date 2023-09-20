import express from "express";
import { registar } from "../controllers/usuarioContoller.js";

const router = express.Router();

router.post("/", registar);
// router.post("/", );

export default router;