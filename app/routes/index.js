const express = require("express");
const generalTables = require("../controllers/generalTablesController");

const router = express.Router();

module.exports = () => {
  router.post("/generaltables", generalTables.addGeneral);

  router.delete("/generaltables/:category", generalTables.deleteCategory);

  router.put("/update-country/:category", generalTables.updateCountry);
  router.put("/update-title/:category", generalTables.updateTitle);
  router.put("/update-currency/:category", generalTables.updateCurrency);
  return router;
};
