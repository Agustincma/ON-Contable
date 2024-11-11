const saveDataSchema = require("../models/SaveData");

exports.addData = async (req, res, next) => {
  try {
    // Verificar que los datos se recibieron
    const { data } = req.body;
    if (!data || data.length === 0) {
      return res
        .status(400)
        .json({ message: "No se recibieron datos para guardar." });
    }

    // Guardar cada item del array de datos en la base de datos
    const savedData = await saveDataSchema.insertMany(data);

    // Responder con éxito
    res.json({ message: "Datos guardados correctamente!", data: savedData });
  } catch (error) {
    console.error("Error al guardar los datos:", error);
    res.status(500).json({ message: "Hubo un error al guardar los datos." });
    next();
  }
};

// GET
exports.fetchSaveData = async (req, res, next) => {
  try {
    const fetchData = await saveDataSchema.find();
    res.json(fetchData);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
