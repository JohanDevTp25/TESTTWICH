import mongoose from "mongoose";

const gamesSchema = mongoose.Schema({
    game: {
        type: String,
        trim: true,
        required: true
    },
    myGame:{
        type: String,
        trim: true,
        required: true
    },
    imagen: {
        type: String,
        trim: true,
        required: true
    },
    creador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
}, {
    timestams: true
})

const Games = mongoose.model('Games', gamesSchema)
export default Games