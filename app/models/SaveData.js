const mongoose = require("mongoose");

const saveDataSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    name: { type: String, required: true },
    country: { type: String, required: true },
    title: { type: String, required: true },
    value: { type: Number, required: true },
    year: { type: Number, required: true },
    months: { type: [String], default: [] },
  },
  { timestamps: true }
);

// Usamos `insertMany` para guardar múltiples documentos al mismo tiempo
module.exports = mongoose.model("SaveData", saveDataSchema);
