import Usuario from "../models/Usuario.js";
import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";

export const registar = async (req, res) => {

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
        return res.json(usuario); // retorna el usuario registrado
    } catch (error) {
        console.log(error);
    }
}

export const auntenticar = async (req, res) => {
    const { email, password } = req.body;

    // Comprobar si el usuario existe
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
        const error = new Error('El usuario no existe');
        return res.status(404).json({ msg: error.message })
    }

    // Comprobar si el usuario esta confirmado
    if (!usuario.confirmado) {
        const error = new Error('El usuario no esta confirmado');
        return res.status(403).json({ msg: error.message })
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
        return res.status(403).json({ msg: error.message })
    }
}

export const confirmar = async (req, res) => {
    const { token } = req.params;
    const usuarioConfirmar = await Usuario.findOne({ token });
    if (!usuarioConfirmar) {
        const error = new Error('Token no valido');
        return res.status(403).json({ msg: error.message });
    } // Si el token obtenido no pertenece a alguien retorna un error
    try {
        usuarioConfirmar.confirmado = true;
        usuarioConfirmar.token = '';
        await usuarioConfirmar.save();
        // Confirma el usuario
        return res.json({ msg: 'Usuario confirmado' });
    } catch (error) {
        console.log(error)
    }
}

export const olvidePassword = async (req, res) => {
    const { email } = req.body;
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
        const error = new Error('El usuario no existe');
        return res.status(404).json({ msg: error.message })
    }

    try {
        usuario.token = generarId();
        await usuario.save();
        res.json({ msg: 'Hemos enviado un email con las instrucciones' });
    } catch (error) {
        console.log(error);
    }
}

export const comprobarToken = async (req, res) => {
    const { token } = req.params;
    const tokenValido = await Usuario.findOne({ token });
    if (!tokenValido) {
        const error = new Error('Token no valido');
        return res.status(403).json({ msg: error.message });
    } // Si el token obtenido no pertenece a alguien retorna un error
    else {
        res.json({ msg: 'Token valido y el usuario existe' });
    }
};

export const nuevoPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    const usuario = await Usuario.findOne({ token });
    if (!usuario) {
        const error = new Error('Token no valido');
        return res.status(403).json({ msg: error.message });
    } // Si el token obtenido no pertenece a alguien retorna un error
    else {
        usuario.password = password;
        usuario.token = '';
        try {
            await usuario.save();
            res.json({ msg: 'Password actualizada' });
        } catch (error) {
            console.log(error);
        }
    }
};

export const perfil = async (req, res) => {
    const { usuario } = req;
    res.json(usuario);
};

// export { registar, auntenticar, confirmar, olvidePassword, comprobarToken };
// ? Se puede tambien exportar cuando se crea la funcion