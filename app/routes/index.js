const express = require("express");
const generalTables = require("../controllers/generalTablesController");
const sectionsTables = require("../controllers/sectionsController");
const processedTable = require("../controllers/dataAnualController");
const router = express.Router();

module.exports = () => {
  router.post("/generaltables", generalTables.addGeneral);
  router.get("/generaltables", generalTables.fetchData);
  router.delete("/generaltables/:category", generalTables.deleteCategory);
  router.put("/update-country/:category", generalTables.updateCountry);
  router.put("/update-title/:category", generalTables.updateTitle);
  router.put("/update-currency/:category", generalTables.updateCurrency);

  // sections

  router.get("/sections", sectionsTables.allCategoryAndTitle);
  router.post("/sections", sectionsTables.addCategoryAndTitle);

  // Processed
  router.post("/procesar-generaltables", processedTable.dataAnual);
  return router;
};
