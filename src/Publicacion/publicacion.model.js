import mongoose, { Schema } from "mongoose";

const publicacionSchema = new Schema({
  titulo: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  curso: {
    type: String,
    enum: ['Tecno', 'taller', 'practicasupervisad'],
    required: true
  },
  comentarios: {
    type:[{
      usuario:{
        type: String,
        required: true
      },
      comentario:{
        type: String,
        required: true
      },
      fecha:{
        type: Date,
        default: Date.now
      }
    }]
  },
  fecha: {
    type: Date,
    default: Date.now
  },
  status:{
        type: Boolean,
        default: true
    },
}, 
{
    timestamps: true,
    versionKey: false
});

publicacionSchema.methods.toJSON = function() {
    const { __v, _id, ...publicacion } = this.toObject();
    publicacion.id = _id;
    return publicacion;
}

export default mongoose.model('Publicacion', publicacionSchema);