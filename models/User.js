var db = require('../db/db')

const { Sequelize, DataTypes } = require('sequelize')
const Funcoes = require('./Funcoes')

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

User.belongsTo(Funcoes)
Funcoes.hasMany(User)

// db.sync({force:true})

module.exports = User