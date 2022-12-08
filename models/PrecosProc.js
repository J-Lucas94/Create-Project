var db = require('../db/db')

const { Sequelize, DataTypes } = require('sequelize')

const PrecosProc = db.define('PrecosProc', {
    id_usuario: {
        references: { model : 'Usuarios', key: 'id'},
        type: DataTypes.STRING,
        allowNull: false,
    },

    id_cliente: {
        references: { model : 'Clientes', key: 'id'},
        type: DataTypes.STRING,
        allowNull: false,
    },

    id_contrato: {
        references: { model : 'Contratos', key: 'id'},
        type: DataTypes.STRING,
        allowNull: false,
    },

    id_proc: {
        references: { model : 'Procedimentos', key: 'id'},
        type: DataTypes.STRING,
        allowNull: false,
    }
})

// PrecosProc.sync({force:true})

module.exports = PrecosProc