const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes)=>{
    const Project = sequelize.define('Project', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description:{
            type: DataTypes.TEXT,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    },{
  tableName: 'projects',  // force table name
});
    

    Project.associate = (models)=>{
        Project.belongsTo(models.User, {foreignKey: 'userId'});
    };
    return Project;
    
};