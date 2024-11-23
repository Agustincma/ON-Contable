// authController.js
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Verificar si el usuario existe
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Comparar la contraseña ingresada con la almacenada (hashed)
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Crear un JWT para el usuario autenticado
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      "yourSecretKey", // Deberías usar una clave secreta más segura
      { expiresIn: "1h" }
    );

    // Responder con el JWT y detalles del usuario
    res.json({
      message: "Login successful",
      token: token,
      user: { id: user._id, username: user.username, role: user.role },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.createUser = async (req, res) => {
  const { username, password, role } = req.body;

  console.log("Received data:", req.body); // Verifica qué datos están llegando

  if (!password || password.length < 6) {
    return res.status(400).json({
      message: "Password is required and must be at least 6 characters long.",
    });
  }

  try {
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario en la base de datos
    const newUser = new User({
      username,
      password: hashedPassword,
      role: role || "user", // Asignar rol por defecto como 'user' si no se especifica
    });

    // Guardar el usuario
    await newUser.save();

    // Crear un JWT para el nuevo usuario
    const token = jwt.sign(
      { userId: newUser._id, role: newUser.role },
      "yourSecretKey", // Deberías usar una clave secreta más segura
      { expiresIn: "1h" }
    );

    // Responder con el JWT y los detalles del nuevo usuario
    res.status(201).json({
      message: "User created successfully",
      token: token,
      user: { id: newUser._id, username: newUser.username, role: newUser.role },
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
