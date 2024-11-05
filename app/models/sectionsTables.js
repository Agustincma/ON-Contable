const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SectionTables = new Schema({
  category: {
    type: String,
    trim: true,
  },
  title: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model("SectionTables", SectionTables);
