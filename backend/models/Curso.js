import mongoose from "mongoose";

const cursosSchema = mongoose.Schema({
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
    imagen: {
        type: String,
        required: true,
        trim: true
    },
    tipoCurso: {
        type: String,
        required: true,
        enum: ['Tecnico', 'Tecnologo', 'Curso especial']
    },
    duracion: {
        type: String,
        required: true,
        trim: true
    },
    fechaInicio: {
        type: Date,
        required: true,
        trim: true
    },
    fechaFin: {
        type: Date,
        required: true,
        trim: true
    },
    centroFormacion: {
        type: String,
        required: true,
        trim: true
    },
    modalidadFormacion: {
        type: String,
        required: true,
        trim: true
    },
    creador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario"
    },
    comentarios: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comentario"
        }
    ]
},
    {
        timestamps: true
    }
)

const Curso = mongoose.model("Curso", cursosSchema);
export default Curso;