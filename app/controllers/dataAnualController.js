const GeneralTable = require("../models/GeneralTables"); // Modelo de la tabla general
const ProcessedTable = require("../models/GeneralTablesProcessed"); // Modelo de la tabla procesada

exports.dataAnual = async (req, res, next) => {
  try {
    const { porcentajeAplicado, ...formData } = req.body; // Obtiene el porcentaje y otros datos del formulario

    // 1. Obtener todos los registros de la tabla general
    const generalRecords = await GeneralTable.find();

    // 2. Aplicar el porcentaje a cada registro
    const newRecords = generalRecords.map((record) => {
      // Asegurarse de que record.value es un número antes de aplicar el porcentaje
      const valueWithPercentage =
        record.value * (1 + parseFloat(porcentajeAplicado) / 100); // Sumar el porcentaje
      return {
        ...record.toObject(), // Convertir el documento a objeto
        value: valueWithPercentage,
      };
    });

    // 3. Guardar los nuevos registros en la tabla 'processedTable'
    const processedRecords = newRecords.map((record) => ({
      category: record.category,
      title: record.title,
      country: record.country,
      currency: record.currency,
      name: record.name,
      value: record.value,
    }));

    // Inserta los registros procesados en la base de datos 'ProcessedTable'
    await ProcessedTable.insertMany(processedRecords);

    res
      .status(200)
      .json({ message: "Datos procesados y guardados correctamente" });
  } catch (error) {
    console.error("Error al procesar los datos:", error);
    res.status(500).json({ message: "Error al procesar los datos" });
    next();
  }
};
