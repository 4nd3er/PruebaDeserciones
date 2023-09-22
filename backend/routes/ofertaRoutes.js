import express from "express";
import {
    obtenerOfertas,
    obtenerOferta,
    nuevaOferta,
    editarOferta,
    eliminarOferta,
    editarEstado
} from "../controllers/ofertaController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.route("/")
    .get(obtenerOfertas)
    .post(checkAuth, nuevaOferta);

router.route("/:id")
    .get(checkAuth, obtenerOferta)
    .post(checkAuth, editarOferta)
    .delete(checkAuth, eliminarOferta);

router.post("/estado/:id", editarEstado);

export default router;