const Sequelize = require('sequelize')

const sequelize = require('../util/database')

const Todo = sequelize.define('task',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false

    },
    status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        Default: false

    },
    priority: {
        type: Sequelize.STRING,
        allowNull: false
        
        
    },
    duetime: {
        type: Sequelize.INTEGER,
        allowNull: false
        
        
    },
    description: {
        type: Sequelize.STRING
        
        
    }

})

module.exports = Todo;