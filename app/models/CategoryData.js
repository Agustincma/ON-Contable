const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategoryData = new Schema(
  {
    category: {
      type: String,
      trim: true,
    },
    value: {
      type: Number,
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
      type: String,
      trim: true,
    },
    month: {
      type: String,
      trim: true,
    },
    year: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
); // Agregar timestamps

// Asegurar que el título y el nombre sean únicos
CategoryData.index({ category: 1, name: 1 }, { unique: true });

module.exports = mongoose.model("CategoryData", CategoryData);
