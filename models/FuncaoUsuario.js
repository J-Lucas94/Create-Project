var db = require('../db/db')

const { Sequelize, DataTypes } = require('sequelize')

const FuncaoUsuario = db.define('FuncaoUsuario', {
    funcoes_id: {
        references: { model : 'Funcoes', key: 'id'},
        type: DataTypes.STRING,
        allowNull: false,
    },

    user_id: {
        references: { model : 'Users', key: 'id'},
        type: DataTypes.STRING,
        allowNull: false,
    },
})

// FuncaoUsuario.sync({force:true})

module.exports = FuncaoUsuario