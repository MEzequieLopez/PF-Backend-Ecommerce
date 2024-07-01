const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./routes/index');
const bodyParser = require('body-parser');
const app = express();

const debugMiddleware = (req, res, next) => {
  console.log('Antes de los middlewares:', req.userId);
  next();
  console.log('Después de los middlewares:', req.userId);
};



// Middlewares
app.use(cors()); 
app.use(morgan('dev')); 
app.use(express.json());
// Middleware para parsear JSON
app.use(bodyParser.json());
// app.use(debugMiddleware);

// Rutas
app.use('/', routes);

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
  });

  module.exports = app 
 