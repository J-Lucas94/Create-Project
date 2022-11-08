var db = require('../db/db')

const { Sequelize, DataTypes } = require('sequelize')

const Clientes = db.define('Clientes', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    email : {
        type: DataTypes.STRING,
        allowNull: false,
    },

    cep: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    uf: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    municipio: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    pais: {
        type: DataTypes.STRING,
        allowNull: false,
    }

})

// Clientes.sync({alter:true})

module.exports = Clientes