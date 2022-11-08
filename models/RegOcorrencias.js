var db = require('../db/db')

const { Sequelize, DataTypes } = require('sequelize')

const RegOcorrencias = db.define('RegOcorrencias', {
    id_usuario: {
        references: { model : 'Users', key: 'id'},
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
    },

    id_admissao: {
        references: { model : 'Admissoes', key: 'id'},
        type: DataTypes.STRING,
        allowNull: false,
    }
})

// RegOcorrencias.sync({force:true})

module.exports = RegOcorrencias