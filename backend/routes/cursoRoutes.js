import express from "express";
import {
    obtenerCursos,
    obtenerCurso,
    nuevoCurso,
    editarCurso,
    eliminarCurso
} from "../controllers/cursoController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.get("/", obtenerCursos);
router.post("/nuevo-curso", checkAuth, nuevoCurso);

router.route("/:id")
    .get(checkAuth, obtenerCurso)
    .put(checkAuth, editarCurso)
    .delete(checkAuth, eliminarCurso);

export default router;