const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
require("dotenv").config(); // Cargar variables de entorno desde .env

const seedUsers = async () => {
  try {
    // Conexión a la base de datos
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Conectado a MongoDB");

    // Crear usuarios a partir de las variables de entorno
    const users = [
      {
        username: process.env.USERNAME_LJUAREZ,
        password: await bcrypt.hash(process.env.PASSWORD_LJUAREZ, 10),
        role: process.env.ROLE_LJUAREZ,
      },
      {
        username: process.env.USERNAME_ADMIN,
        password: await bcrypt.hash(process.env.PASSWORD_ADMIN, 10),
        role: process.env.ROLE_ADMIN,
      },
    ];

    // Inserta los usuarios en la base de datos
    await User.insertMany(users);
    console.log("Usuarios insertados correctamente");
  } catch (error) {
    console.error("Error insertando usuarios:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedUsers();
