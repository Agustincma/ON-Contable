require("dotenv").config({ path: __dirname + "/../.env" });

const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const seedUsers = async () => {
  try {
    const mongoURI = "mongodb://localhost:27017/app-contable";

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Conectado a MongoDB");

    const users = [
      {
        username: process.env.USERNAME_ELVIMARF,
        password: await bcrypt.hash(process.env.PASSWORD_ELVIMARF, 10),
        role: process.env.ROLE_ELVIMARF,
      },
      {
        username: process.env.USERNAME_ADMIN,
        password: await bcrypt.hash(process.env.PASSWORD_ADMIN, 10),
        role: process.env.ROLE_ADMIN,
      },
    ];

    await User.insertMany(users);
    console.log("Usuarios insertados correctamente");
  } catch (error) {
    console.error("Error insertando usuarios:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedUsers();
