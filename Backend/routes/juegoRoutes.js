import express from "express";
import { 
    twichgames,
    obtenerJuegos,
    agregarJuego,
    editarJuego,
    eliminarJuego} from '../controllers/juegosController.js'
import checkAuth from '../middleware/checkAuth.js'

const router = express.Router();


router.route('/',).get( checkAuth, obtenerJuegos).post(checkAuth, agregarJuego)
router.route('/:id').put(checkAuth, editarJuego).delete(checkAuth, eliminarJuego)
router.get('/twich-games', checkAuth, twichgames )

export default router