const GeneralTables = require("../models/GeneralTables");

// ADD
exports.addGeneral = async (req, res, next) => {
  const category = await GeneralTables(req.body);
  try {
    await category.save();
    res.json({ message: "Se añadio una nueva categoria!" });
  } catch (error) {
    console.log(error);
    next();
  }
};

// DELETE
exports.deleteCategory = async (req, res, next) => {
  try {
    const category = await GeneralTables.findOneAndDelete({
      category: req.params.category,
    });
    res.json({ message: "La categoria ha sido eliminada!" });
  } catch (error) {
    console.log(error);
    next();
  }
};

// Actualizar valores segun categoria
exports.updateCountry = async (req, res, next) => {
  try {
    const updatedCountry = await GeneralTables.findOneAndUpdate(
      {
        category: req.params.category,
      },
      { country: req.body.newCountry },
      {
        new: true,
      }
    );

    if (!updatedCountry) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }

    res.json(updatedCountry);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error al actualizar el país", details: error.message });
    next();
  }
};
exports.updateTitle = async (req, res, next) => {
  try {
    const updateTitle = await GeneralTables.findOneAndUpdate(
      {
        category: req.params.category,
      },
      { title: req.body.newTitle },
      {
        new: true,
      }
    );

    if (!updateTitle) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }

    res.json(updateTitle);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error al actualizar el titulo", details: error.message });
    next();
  }
};
exports.updateCurrency = async (req, res, next) => {
  try {
    const updateCurrency = await GeneralTables.findOneAndUpdate(
      {
        category: req.params.category,
      },
      { currency: req.body.newCurrency },
      {
        new: true,
      }
    );

    if (!updateCurrency) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }

    res.json(updateCurrency);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error al actualizar la moneda!",
      details: error.message,
    });
    next();
  }
};
