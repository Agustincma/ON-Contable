// index.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const routes = require("./routes/index");
const cors = require("cors");

const app = express();
const port = 3005;

mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://localhost/on-contable")
  .then(() => console.log(`Conexion exitosa a la Base de datos✅`))
  .catch((error) => {
    console.log(`Ha ocurrido un error en la conexión a la Base de datos! ❌`);
    console.log(error);
  });

// Middleware
app.use(cors({ origin: "http://localhost:5173" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas
app.use("/", routes());

app.listen(port, () => {
  console.log(`El servidor esta corriendo en el puerto ${port} ✅`);
});
