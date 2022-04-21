import express from "express";
const router = express.Router();

import {
  registrar,
  autenticar,
  confirmar,
  olvidePassword,
  comprobarToken,
  nuevoPassword,
  perfil
} from "../controllers/usuarioController.js";
import checkAuth from "../middleware/checkAuth.js";


//AuthSystem
router.post("/", registrar);
router.post("/login", autenticar);
router.get("/confirm/:token", confirmar);
router.post("/reset-pass", olvidePassword);
router.route("/reset-pass/:token")
        .get(comprobarToken)
        .post(nuevoPassword);

router.get('/profile', checkAuth, perfil)

export default router;
