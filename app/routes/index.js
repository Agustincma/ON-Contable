const express = require("express");
const sectionsTables = require("../controllers/sectionsController");
// const processedTable = require("../controllers/dataAnualController");
const categoryTable = require("../controllers/categoryController");
const SaveData = require("../controllers/saveDataController");
const authController = require("../controllers/authController");
const router = express.Router();

module.exports = () => {
  router.post("/category", categoryTable.addGeneral);
  router.get("/category", categoryTable.fetchData);
  router.delete("/category/:category", categoryTable.deleteCategory);
  router.put("/update-country/:category", categoryTable.updateCountry);
  router.put("/update-title/:category", categoryTable.updateTitle);
  router.put("/update-currency/:category", categoryTable.updateCurrency);
  router.put("/category/:id", categoryTable.updateRecord);
  router.get("/category/:id", categoryTable.specificRecord);
  router.delete("/register/:id", categoryTable.deleteIdCategory);

  // sections

  router.get("/sections", sectionsTables.allCategoryAndTitle);
  router.post("/sections", sectionsTables.addCategoryAndTitle);
  router.delete(
    "/sections-category/:category",
    sectionsTables.deleteAllCategory
  );
  router.delete(
    "/sections-category/:category/:title",
    sectionsTables.deleteByCategoryAndTitle
  );

  // Processed
  // router.post("/procesar-generaltables", processedTable.dataAnual);

  // Save Data
  router.post("/save-data", SaveData.addData);
  router.get("/save-data", SaveData.fetchSaveData);
  router.get("/save-data-name/:name", SaveData.fetchSaveDataForName);
  router.delete("/save-data", SaveData.deleteSaveData);

  //Auth
  router.post("/login", authController.login);

  return router;
};
