import Usuario from "../models/Usuario.js";
import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";

const registar = async (req, res) => {

    // Evitar registros duplicados
    const { email } = req.body; // consigue el email del request que llega
    const existeUsuario = await Usuario.findOne({ email }); // Busca si hay algun email con ese email

    if (existeUsuario) {
        const error = new Error('Usuario ya existe');
        return res.status(400).json({ msg: error.message });
    } // Busca si alguien tiene el mismo email y retorna un error para que detenga la funcion

    try {
        const usuario = new Usuario(req.body); // hace una copia del modelo y asignandole los parametros
        usuario.token = generarId(); // Genera un token para el usuario
        await usuario.save(); // Guarda el usuario en la base de datos
        res.json({ usuario }); // retorna el usuario registrado
    } catch (error) {
        console.log(error);
    }
}

const auntenticar = async (req, res) => {
    const { email, password } = req.body;

    // Comprobar si el usuario existe
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
        const error = new Error('El usuario no existe');
        res.status(404).json({ msg: error.message })
    }

    // Comprobar si el usuario esta confirmado
    if (!usuario.confirmado) {
        const error = new Error('El usuario no esta confirmado');
        res.status(403).json({ msg: error.message })
    }

    // Comprobar su password
    if (await usuario.comprobarPassword(password)) {
        res.json({
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarJWT(usuario._id) // Generar un token en base al id del usuario
        })
    } else {
        const error = new Error('La contraseña es incorrecta');
        res.status(403).json({ msg: error.message })
    }
}

const confirmar = async (req, res) => {
    const { token } = req.params;
    const usuarioConfirmar = await Usuario.findOne({ token });
    if (!usuarioConfirmar) {
        const error = new Error('Token no valido');
        res.status(403).json({ msg: error.message });
    } // Si el token obtenido no pertenece a alguien retorna un error
    try {
        usuarioConfirmar.confirmado = true;
        usuarioConfirmar.token = '';
        await usuarioConfirmar.save();
        // Confirma el usuario
        res.json({ msg: 'Usuario confirmado' });
    } catch (error) {
        console.log(error)
    }
}

export { registar, auntenticar, confirmar };