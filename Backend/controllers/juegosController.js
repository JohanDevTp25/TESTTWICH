import Games from '../models/Games.js'
import axios from 'axios'
import dotenv from "dotenv"

dotenv.config()


let url = `https://id.twitch.tv/oauth2/token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&grant_type=client_credentials`;

const twichgames = async(req, res) => {

    let token = await axios
    .post(url)
    .then((response) => {
      let token = response;
      return token;
    })
    .catch((error) => {
      console.log(error);
    });

  const {data} = await axios
    .get("https://api.twitch.tv/helix/games/top?first=100", {
      headers: {
        Authorization: `Bearer ${token.data.access_token}`,
        "Client-Id": process.env.CLIENT_ID,
      },
    })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.log(error);
    });

  res.status(200).json(data);

}

const obtenerJuegos = async (req, res) => {
    const juegos = await Games.find().where('creador').equals(req.usuario)

    res.json(juegos)
}

const agregarJuego = async (req, res) => {
  const {game} = req.body

    const juego = new Games(req.body)
    juego.creador = req.usuario._id

    const existeJuego = await Games.findOne({ game }).where('creador').equals(req.usuario);

    if (existeJuego) {
      const error = new Error("Ya posees este juego en tu coleccion");
      return res.status(400).json({ msg: error.message });
    }

    try {
        const juegoAlmacenado = await juego.save()
        res.json(juegoAlmacenado)
    } catch (error) {
      console.log(error);
    }
}

const editarJuego = async (req, res) => {
    const {id} = req.params;

    const juego = await Games.findById(id)

    if (!juego) {
        const error = new Error('Accion no valida')
        return res.status(404).json({msg: error.message})
    }

    if(juego.creador.toString() !== req.usuario._id.toString()){
        const error = new Error('Accion no valida')
        return res.status(401).json({msg: error.message})
    }

    juego.myGame = req.body.myGame || juego.myGame


    try {
        const juegoAlmacenado = await juego.save()
        res.json(juegoAlmacenado)
    } catch (error) {
        console.log(error);
    }

}

const eliminarJuego = async (req, res) => {
    const {id} = req.params;

    const juego = await Games.findById(id)

    if (!juego) {
        const error = new Error('Accion no valida')
        return res.status(404).json({msg: error.message})
    }

    if(juego.creador.toString() !== req.usuario._id.toString()){
        const error = new Error('Accion no valida')
        return res.status(401).json({msg: error.message})
    }

    try {
        await juego.deleteOne()
        res.json({msg: "Proyecto Eliminado"})

    } catch (error) {
        console.log(error);
    }
}

export {
    twichgames,
    obtenerJuegos,
    agregarJuego,
    editarJuego,
    eliminarJuego
}