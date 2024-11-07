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
      return res
        .status(400)
        .json({
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
