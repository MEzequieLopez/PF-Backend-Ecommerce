const firebaseAdmin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // Ajusta la ruta según corresponda

firebaseAdmin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = firebaseAdmin;
