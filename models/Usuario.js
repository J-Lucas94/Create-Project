let db = require('../db/db')

const { Sequelize, DataTypes } = require('sequelize')

const Usuario = db.define('Usuario', {

    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },

    senha:{
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false
    },

    perfilSolicitante: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },

    perfilEntregador: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },

    perfilAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },

})

// Usuario.sync({alter:true})

module.exports = Usuario