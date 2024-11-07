const mongoose = require("mongoose");

const processedTableSchema = new mongoose.Schema({
  category: String,
  title: String,
  country: String,
  currency: String,
  name: String,
  value: Number,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const ProcessedTable = mongoose.model("ProcessedTable", processedTableSchema);

module.exports = ProcessedTable;
