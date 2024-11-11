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
    title: {
      type: String,
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
);

module.exports = mongoose.model("CategoryData", CategoryData);
