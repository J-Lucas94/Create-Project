var db = require('../db/db')

const { Sequelize, DataTypes } = require('sequelize')

const Canis = db.define('Canis', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

// db.sync({alter:true})

module.exports = Canis