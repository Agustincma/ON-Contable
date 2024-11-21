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

exports.fetchSaveDataForName = async (req, res, next) => {
  try {
    const fetchDataForName = await saveDataSchema.find({
      name: { $regex: req.params.name, $options: "i" },
    });

    if (fetchDataForName.length === 0) {
      console.log(`Búsqueda sin resultados para: ${req.params.name}`);
      return res.status(404).json({
        message: `No se encontraron registros para el nombre: ${req.params.name}`,
      });
    }

    res.json(fetchDataForName);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

//DELETE

exports.deleteSaveData = async (req, res, next) => {
  try {
    await saveDataSchema.deleteMany();
    res.status(200).json({ message: "Datos eliminados correctamente!" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error al eliminar los datos", error: error.message });
    next();
  }
};
