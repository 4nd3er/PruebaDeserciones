import Curso from "../models/Curso.js";
import Oferta from "../models/Oferta.js";

export const obtenerOfertas = async (req, res) => {
    const ofertas = await Oferta.find();
    res.json(ofertas);
};

export const nuevaOferta = async (req, res) => {
    const { curso } = req.body;

    const cursoExiste = await Curso.findById(curso);

    if (!cursoExiste) {
        const error = new Error("El curso no existe")
        return res.status(404).json({ msg: error.message })
    }

    try {
        const oferta = await Oferta.create(req.body);
        res.json(oferta);
    } catch (error) {
        console.log(error);
    }
};

export const obtenerOferta = async (req, res) => {
    const { id } = req.params;
    const oferta = await Oferta.findById(id).populate("curso");

    if (!oferta) {
        const error = new Error("Oferta no encontrada");
        return res.status(404).json({ msg: error.message });
    }
    res.json(oferta);
};

export const editarOferta = async (req, res) => {
    const { id } = req.params;
    const oferta = await Oferta.findById(id);

    if (!oferta) {
        const error = new Error("Oferta no encontrada");
        return res.status(404).json({ msg: error.message });
    }
    oferta.titulo = req.body.titulo || oferta.titulo;
    oferta.descripcion = req.body.descripcion || oferta.descripcion;
    oferta.estado = req.body.estado || oferta.estado;
    oferta.cursos = req.body.cursos || oferta.cursos;

    try {
        await oferta.save();
        res.json(oferta);
    } catch (error) {
        console.log(error);
    }
};

export const eliminarOferta = async (req, res) => {
    const { id } = req.params;
    const oferta = await Oferta.findById(id);

    if (!oferta) {
        const error = new Error("Oferta no encontrada");
        return res.status(404).json({ msg: error.message });
    }

    try {
        oferta.estado = false;
        oferta.save();
        res.json('Oferta archivada');
    } catch (error) {
        console.log(error);
    }
};

export const editarEstado = async (req, res) => {

};