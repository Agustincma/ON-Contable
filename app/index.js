const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const routes = require("./routes/index");

const app = express();
const port = 3005;

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/on-contable");
try {
  console.log(`Conexion exitosa a la Base de datos✅`);
} catch (error) {
  console.log(`Ha ocurrido un error en el puerto! ❌`);
  console.log(error);
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", routes());

app.listen(port, () => {
  try {
    console.log(`El servidor esta corriendo en el puerto ${port} ✅`);
  } catch (error) {
    console.log(`Ha ocurrido un error en el puerto! ❌`);
    console.log(error);
  }
});
