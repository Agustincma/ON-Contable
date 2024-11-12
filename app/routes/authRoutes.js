// authRoutes.js
const express = require("express");
const authController = require("../controllers/authController"); // Asegúrate de importar correctamente
const verifyToken = require("../middlewares/verifyToken"); // Importa el middleware correctamente

const router = express.Router();

// Ruta para login
router.post("/login", authController.login); // Llama al controlador `login`

// Ruta para creación de usuario (solo admin puede acceder a esta)
router.post("/create", authController.createUser);

// Ruta protegida (ejemplo de uso del middleware)
router.get("/protectedRoute", verifyToken, (req, res) => {
  res
    .status(200)
    .json({ message: "This is a protected route", userId: req.userId });
});

module.exports = router;
