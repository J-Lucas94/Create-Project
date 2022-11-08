var db = require('../db/db')

const { Sequelize, DataTypes } = require('sequelize')

const Procedimentos = db.define('Procedimentos', {
    descricao: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

// Procedimentos.sync({alter:true})

module.exports = Procedimentos