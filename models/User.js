var db = require('../db/db')

const { Sequelize, DataTypes } = require('sequelize')

const User = db.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    password : {
        type: DataTypes.STRING,
        allowNull: false,
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
    }

})

// User.sync({alter:true})

module.exports = User