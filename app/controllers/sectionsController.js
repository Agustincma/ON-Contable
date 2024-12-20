const SectionTables = require("../models/sectionsTables");
// ADD
exports.addCategoryAndTitle = async (req, res, next) => {
  const { category, title } = req.body;

  try {
    // Intentar crear un nuevo registro
    await SectionTables.create({ category, title });
    res.json({ message: "Se añadió una nueva categoría y título!" });
  } catch (error) {
    // Capturar error de índice único (MongoDB) si el registro ya existe
    if (error.code === 11000) {
      // Código 11000 es para errores de clave duplicada en MongoDB
      return res.status(400).json({
        message: "Ya existe una entrada con la misma categoría y título.",
      });
    }
    console.error(error);
    next(error); // Pasar el error al manejador de errores
  }
};

exports.allCategoryAndTitle = async (req, res, next) => {
  try {
    const category = await SectionTables.find();
    res.json(category);
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.deleteAllCategory = async (req, res, next) => {
  try {
    const { category } = req.params; // Obtén la categoría del parámetro de la URL

    // Elimina todos los registros que coincidan con la categoría
    const result = await SectionTables.deleteMany({ category });

    // Verificamos si se eliminaron registros
    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ message: "No se encontraron registros para esa categoría" });
    }

    // Respondemos con éxito
    res.json({
      message: `Se eliminaron ${result.deletedCount} registros de la categoría "${category}"`,
    });
  } catch (error) {
    console.log(error);
    next(error); // Llama al siguiente middleware con el error
  }
};

// Controlador para eliminar un registro por categoría y título
exports.deleteByCategoryAndTitle = async (req, res, next) => {
  try {
    const { category, title } = req.params; // Obtenemos los valores de category y title desde los parámetros de la URL

    // Buscamos y eliminamos el registro que coincida con ambos campos: category y title
    const result = await SectionTables.deleteOne({ category, title });

    // Si no se encontró ningún registro para eliminar
    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({
          message:
            "No se encontró el registro con la categoría y título proporcionados",
        });
    }

    // Respondemos con éxito
    res.json({
      message: `El registro con categoría "${category}" y título "${title}" ha sido eliminado`,
    });
  } catch (error) {
    console.log(error);
    next(error); // Llama al siguiente middleware con el error
  }
};
