const Sequelize = require('sequelize')

const sequelize = require('../util/database')

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    firstName: {
        type: Sequelize.STRING    
    },
    lastName: {
        type: Sequelize.STRING
    },
    resetToken: String,
    resetTokenExpiration: Date,

    email: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING,
        require: true
    }
})

module.exports = User;
