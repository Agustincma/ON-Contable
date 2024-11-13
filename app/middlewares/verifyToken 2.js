// verifyToken.js
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  // Obtener el token del encabezado (header) Authorization
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  // Verificar el token
  jwt.verify(token, "yourSecretKey", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Guardar la información decodificada del token en el objeto `req`
    req.userId = decoded.userId;
    req.role = decoded.role;

    // Continuar con el siguiente middleware o ruta
    next();
  });
};

module.exports = verifyToken;
