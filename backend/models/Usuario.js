import mongoose from "mongoose";
import bycrypt from 'bcrypt';

const usuarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        require: true,
        trim: true,
    },
    password: {
        type: String,
        require: true,
        trim: true,
    },
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true,
    },
    token: {
        type: String,
    },
    confirmado: {
        type: Boolean,
        default: false,
    },
},
    {
        timestamps: true,
    }
);

usuarioSchema.pre('save', async function(next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bycrypt.genSalt(10);
    this.password = bycrypt.hash(this.password, salt);
}) // .pre hace que la funcion se ejecute antes de que se registre un usuario

usuarioSchema.methods.comprobarPassword = async function(passwordFormulario) {
    return await bycrypt.compare(passwordFormulario, this.password)
}

const Usuario = mongoose.model("Usuario", usuarioSchema);

export default Usuario;