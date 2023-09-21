import express from "express";
import { registar, auntenticar, confirmar } from "../controllers/usuarioContoller.js";

const router = express.Router();

router.post("/", registar);
router.post("/login", auntenticar);
router.get("/confirmar/:token", confirmar);

export default router;