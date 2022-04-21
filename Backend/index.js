import express from 'express'
import cors from 'cors'
import dotenv from "dotenv"
import conectarDB from './config/db.js';
import usuarioRoutes from './routes/usuarioRoutes.js';
import juegoRoutes from './routes/juegoRoutes.js'

const app = express()
app.use(express.json())
dotenv.config()

conectarDB()

const whitelist = [process.env.FRONTEND_URL]

const corsOptions = {
    origin: function(origin, callback) {
        if (whitelist.includes(origin)) {
            callback(null, true)
        }else{
            callback(new Error('Error de Cors'))
        }
    }
}

app.use(cors(corsOptions))

//Routing
app.use('/api/users', usuarioRoutes)
app.use('/api/games', juegoRoutes)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`corriendo en el puerto ${PORT}`);
})