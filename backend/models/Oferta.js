import mongoose from "mongoose";

const ofertaSchema = mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        trim: true
    },
    descripcion: {
        type: String,
        required: true,
        trim: true
    },
    estado: {
        type: Boolean,
        default: true
    },
    cursos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Curso"
        }
    ],
},

)

const Oferta = mongoose.model("Oferta", ofertaSchema);
export default Oferta;