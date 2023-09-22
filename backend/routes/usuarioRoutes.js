import express from "express";
import {
    registar,
    auntenticar,
    confirmar,
    olvidePassword,
    comprobarToken,
    nuevoPassword,
    perfil
} from "../controllers/usuarioContoller.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.post("/", registar);
router.post("/login", auntenticar);
router.get("/confirmar/:token", confirmar);
router.post("/olvide-password", olvidePassword);
// router.get('/olvide-password/:token', comprobarToken);
// router.post('/olvide-password/:token', nuevoPassword);
router.route('/olvide-password/:token').get(comprobarToken).post(nuevoPassword);
// ? Mejor orden

router.get('/perfil', checkAuth, perfil);

export default router; nuevoPassword