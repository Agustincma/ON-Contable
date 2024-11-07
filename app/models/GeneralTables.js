const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GeneralTables = new Schema(
  {
    category: {
      type: String,
      trim: true,
    },
    title: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
    },
    currency: {
      type: String,
      trim: true,
    },
    name: {
      // Campo para el nombre
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
); // Agregar timestamps

// Asegurar que el título y el nombre sean únicos
GeneralTables.index({ title: 1, name: 1 }, { unique: true });

module.exports = mongoose.model("GeneralTable", GeneralTables);
