'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};


let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });


// Define associations
const { User, Project, Task } = db;

if (User && Project) {
  User.hasMany(Project, { foreignKey: 'userId' });
  Project.belongsTo(User, { foreignKey: 'userId' });
}

if (Project && Task) {
  Project.hasMany(Task, { foreignKey: 'projectId' });
  Task.belongsTo(Project, { foreignKey: 'projectId' });
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;



// After db.User = User;
if (db.User.associate) db.User.associate(db);
if (db.Project.associate) db.Project.associate(db);


module.exports = db;
