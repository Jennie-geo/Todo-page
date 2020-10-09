const Sequelize = require('sequelize')

const sequelize = new Sequelize('todo', 'root', 'firstdatabase', {
    dialect: 'mysql',
    host: 'localhost'
})

module.exports = sequelize;

