const SectionTables = require("../models/sectionsTables");
// ADD
exports.addCategoryAndTitle = async (req, res, next) => {
  const category = await SectionTables(req.body);
  try {
    await category.save();
    res.json({ message: "Se añadio una nueva categoria y titulo!" });
  } catch (error) {
    console.log(error);
    next();
  }
};
