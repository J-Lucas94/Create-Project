var db = require('../db/db')

const { Sequelize, DataTypes } = require('sequelize')

const Admissoes = db.define('Admissoes', {
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

    id_chip: {
        references: { model : 'Chips', key: 'id'},
        type: DataTypes.STRING,
        allowNull: false,
    },

    id_canil: {
        references: { model : 'Canis', key: 'id'},
        type: DataTypes.STRING,
        allowNull: false,
    },

    id_via: {
        references: { model : 'ViasAdmissao', key: 'id'},
        type: DataTypes.STRING,
        allowNull: false,
    }
})

// Admissoes.sync({force:true})

module.exports = Admissoes