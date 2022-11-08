var db = require('../db/db')

const { Sequelize, DataTypes } = require('sequelize')

const Baixa = db.define('Baixa', {
    id_motBaixa: {
        references: { model : 'MotivosBaixas', key: 'id'},
        type: DataTypes.STRING,
        allowNull: false,
    },

    id_admissao: {
        references: { model : 'Admissoes', key: 'id'},
        type: DataTypes.STRING,
        allowNull: false,
    }
})

// Baixa.sync({force:true})

module.exports = Baixa