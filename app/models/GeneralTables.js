const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GeneralTables = new Schema({
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
});

module.exports = mongoose.model("GeneralTable", GeneralTables);
