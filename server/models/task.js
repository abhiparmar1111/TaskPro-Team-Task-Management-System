const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define('Task', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
        },
        status: {
            type: DataTypes.ENUM('todo', 'in-progress', 'done'),
            defaultValue: 'todo',
        },
        dueDate: {
            type: DataTypes.DATE,
        },
        projectId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'projects',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
    }, {
        tableName: 'tasks',  // force lowercase table name
    }, {
        timestamps: true,
    });

    Task.associate = (models) => {
        Task.belongsTo(models.Project, { foreignKey: 'projectId', onDelete: 'CASCADE', });
    };
    return Task;
};
