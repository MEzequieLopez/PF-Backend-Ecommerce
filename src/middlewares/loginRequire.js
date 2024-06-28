const jwt = require('jsonwebtoken');
const { SECRET } = process.env;
const firebaseAdmin = require('../firebaseConfig/firebaseConfig'); // Ajusta la ruta según corresponda
const { User } = require('../db'); // Importa tu modelo de usuario

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  
  if (!authHeader) {
    return res.status(401).json({ error: 'No se provee de un token, autorización negada' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Token inválido, autorización negada' });
  }

  try {
    // Intentar verificar como un token JWT normal
    const decoded = jwt.verify(token, SECRET);
    req.userId = decoded.id;
    req.userEmail = decoded.email;
    return next();
  } catch (error) {
    // Si falla, intentar verificar como un token de Firebase
    try {
      const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
      const { uid, email } = decodedToken;
      
      // Busca el usuario en la base de datos
      let user = await User.findOne({ where: { firebaseUid: uid } });
      if (!user) {
        user = await User.create({ email, firebaseUid: uid });
      }

      // Genera un JWT propio si necesitas mantener consistencia
      const newToken = jwt.sign({ userId: user.id }, SECRET);
      
      req.userId = user.id;
      req.userEmail = user.email;
      req.token = newToken; // puedes pasar el nuevo token de vuelta al cliente
      return next();
    } catch (firebaseError) {
      return res.status(401).json({ error: 'El token no es válido, autorización negada.' });
    }
  }
};

module.exports = verifyToken;
