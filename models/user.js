const Sequelize = require('sequelize')

const sequelize = require('../util/database')

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING    
    },
    email: {
        type: Sequelize.STRING
    }
})

module.exports = User;

//after creating User model, we will create an association in app.js.