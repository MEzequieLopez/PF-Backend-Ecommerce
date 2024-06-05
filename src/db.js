require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_NAME
} = process.env;


  const sequelize = new Sequelize({ 
  database: `${DB_NAME}`,
  username: `${DB_USER}`,
  password: `${DB_PASSWORD}`,
  host: `${DB_HOST}`,
  dialect: 'postgres',
  
  /*dialectOptions: {
    ssl: {
      require: true, 
      rejectUnauthorized: false 
    }
  }, */
  logging: false,
}); 

sequelize.options.timezone = 'America/Mexico_City'; 
const basename = path.basename(__filename);
const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// const  = sequelize.models;
const { Template, Category, Technology, User } = sequelize.models;

// Category.hasMany(Template);
// Template.belongsTo(Category);

Template.belongsToMany(Category, { through: 'TemplateCategories' });
Template.belongsToMany(User, { through: 'userFavorites', as:"Users" });
Template.belongsToMany(Technology, { through: 'TemplateTechnologies' });

Category.belongsToMany(Template, { through: 'TemplateCategories' });
User.belongsToMany(Template, { through: 'userFavorites', as: "Favorites" });
Technology.belongsToMany(Template, { through: 'TemplateTechnologies' });

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
