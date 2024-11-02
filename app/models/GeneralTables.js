const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GeneralTables = new Schema({
  category: {
    type: String,
    unique: true,
    trim: true,
  },
  title: {
    type: String,
    unique: true,
    trim: true,
  },
  country: {
    type: String,
    unique: true,
    trim: true,
  },
  currency: {
    type: String,
    unique: true,
    trim: true,
  },
});

module.exports = mongoose.model("GeneralTable", GeneralTables);
