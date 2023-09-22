import Curso from "../models/Curso.js";

export const obtenerCursos = async (req, res) => {
    const cursos = await Curso.find();
    res.json(cursos);
};

export const nuevoCurso = async (req, res) => {
    const curso = await Curso.create(req.body);
    curso.creador = req.usuario._id;

    try {
        // TODO await curso.save();
        res.json(curso);
    } catch (error) {
        console.log(error);
    }
};

export const obtenerCurso = async (req, res) => {
    const { id } = req.params;
    const curso = await Curso.findById(id);
    if (!proyecto) {
        return res.status(404).json({ msg: 'Proyecto no econtrado' })
    }
    res.json(curso);
};


export const editarCurso = async (req, res) => {
    const { id } = req.params;
    const curso = await Curso.findById(id);
    if (!proyecto) {
        return res.status(404).json({ msg: 'Proyecto no econtrado' })
    }
    proyecto.titulo = req.body.titulo || proyecto.titulo;
    proyecto.descripcion = req.body.descripcion || proyecto.descripcion;
    proyecto.imagen = req.body.imagen || proyecto.imagen;
    proyecto.duracion = req.body.duracion || proyecto.duracion;
    proyecto.tipoCurso = req.body.tipoCurso || proyecto.tipoCurso;
    proyecto.duracion = req.body.duracion || proyecto.duracion;
    proyecto.fechaInicio = req.body.fechaInicio || proyecto.fechaInicio;
    proyecto.fechaFin = req.body.fechaFin || proyecto.fechaFin;
    proyecto.centroFormacion = req.body.centroFormacion || proyecto.centroFormacion;
    proyecto.modalidadFormacion = req.body.modalidadFormacion || proyecto.modalidadFormacion;

    try {
        // TODO await curso.save();
        res.json(curso);
    } catch (error) {
        console.log(error);
    }
};

export const eliminarCurso = async (req, res) => {
    const { id } = req.params;
    const curso = await Curso.findById(id);
    if (!proyecto) {
        return res.status(404).json({ msg: 'Proyecto no econtrado' })
    }

    try {
        await curso.deleteOne();
        res.json({ msg: 'Proyecto eliminado' });
    } catch (error) {
        console.log(error);
    }
};