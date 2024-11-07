const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SectionTablesSchema = new Schema({
  category: {
    type: String,
    trim: true,
    required: true,
  },
  title: {
    type: String,
    trim: true,
    required: true,
  },
});

// Índice único para la combinación de category y title
SectionTablesSchema.index({ category: 1, title: 1 }, { unique: true });

module.exports = mongoose.model("SectionTables", SectionTablesSchema);
