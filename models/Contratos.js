var db = require('../db/db')

const { Sequelize, DataTypes } = require('sequelize')

const Contratos = db.define('Contratos', {

    id_cliente: {
        references: { model : 'Clientes', key: 'id'},
        type: DataTypes.STRING,
        allowNull: false,
    },

    id_usuario: {
        references: { model : 'Usuarios', key: 'id'},
        type: DataTypes.STRING,
        allowNull: false,
    }
})

// Contratos.sync({force:true})

module.exports = Contratos