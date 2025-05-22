import Publicacion from '../Publicacion/publicacion.model.js';


export const crearPublicacion = async (req, res) => {
  try {
    const { titulo, descripcion, curso } = req.body;

    const nuevaPublicacion = new Publicacion({ titulo, descripcion, curso });
    await nuevaPublicacion.save();

    res.status(201).json(nuevaPublicacion);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear la publicación', error });
  }
};


export const obtenerPublicaciones = async (req, res) => {
  try {
    const publicaciones = await Publicacion.find({ status: true }).sort({ date: -1 });
    res.status(200).json(publicaciones);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener las publicaciones', error });
  }
}

export const obtenerPublicacionPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const publicacion = await Publicacion.findById(id);

    if (!publicacion) return res.status(404).json({ mensaje: 'Publicación no encontrada' });

    res.status(200).json({ publicacion });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener la publicación', error });
  }
};


export const filtrarPublicaciones = async (req, res) => {
  try {
    const { curso } = req.query;
    const consulta = { status: true };

    if (curso) {
      consulta.curso = curso;
    }

    const publicaciones = await Publicacion.find(consulta).sort({ date: -1 });
    return res.status(200).json({
      success: true,
      publicaciones,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const anadirComentario = async (req, res) => {
  try {
    const { usuario, comentario } = req.body;

    const publicacion = await Publicacion.findById(req.params.id);
    if (!publicacion) return res.status(404).json({ error: "Publicación no encontrada" });

    publicacion.comentarios.unshift({ usuario, comentario });
    await publicacion.save();
    res.status(200).json(publicacion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const eliminarPublicacion = async (req, res) => {
  try {
    const eliminada = await Publicacion.findByIdAndUpdate(req.params.id, { status: false }, { new: true });
    if (!eliminada) return res.status(404).json({ error: "Publicación no encontrada" });

    res.status(200).json({ mensaje: "Publicación eliminada correctamente" });
  } catch (err) {
    res.status (500).json({ error: err.message });
  }
};