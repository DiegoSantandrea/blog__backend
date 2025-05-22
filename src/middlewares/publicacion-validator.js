import { body, param } from "express-validator";
import { validateFields } from "../middlewares/validate-fields.js";
import { handleErrors } from "../middlewares/handle-error.js";

export const cursosValidos = [
  'Tecno', 'taller', 'practicasupervisad'
];

export const validarCrearPublicacion = [
  body("titulo")
    .notEmpty()
    .withMessage("El título es obligatorio")
    .isLength({ min: 3 })
    .withMessage("El título debe tener al menos 3 caracteres"),
  body("descripcion")
    .notEmpty()
    .withMessage("la descripcion es obligatorio")
    .isLength({ min: 10 })
    .withMessage("la descripcion debe tener al menos 10 caracteres"),
  body("curso")
    .notEmpty()
    .withMessage("El curso es obligatorio")
    .custom((value) => {
      if (!cursosValidos.includes(value)) {
        throw new Error(`El curso debe ser uno de los siguientes: ${cursosValidos.join(", ")}`);
      }
      return true;
    }),
  validateFields,
  handleErrors
];

export const validarFiltrarPublicaciones = [
  param("curso")
    .optional()
    .custom((value) => {
      if (!cursosValidos.includes(value)) {
        throw new Error(`El curso debe ser uno de los siguientes: ${cursosValidos.join(", ")}`);
      }
      return true;
    }),
  param("titulo")
    .optional()
    .isString()
    .withMessage("El título debe ser una cadena de texto"),
  param("sortByDate")
    .optional()
    .isIn(["asc", "desc"])
    .withMessage("Opción de ordenamiento inválida (asc o desc)"),
  validateFields,
  handleErrors
];

export const validarAnadirComentario = [
  body("usuario")
    .notEmpty()
    .withMessage("El nombre de usuario es obligatorio")
    .isLength({ min: 5 })
    .withMessage("El nombre de usuario debe tener al menos 3 caracteres"),
  body("comentario")
    .notEmpty()
    .withMessage("El comentario es obligatorio")
    .isLength({ min: 5 })
    .withMessage("El comentario debe tener al menos 5 carácters"),
  validateFields,
  handleErrors
];