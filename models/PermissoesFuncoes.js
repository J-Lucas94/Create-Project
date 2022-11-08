var db = require('../db/db')

const { Sequelize, DataTypes } = require('sequelize')
const Funcoes = require('./Funcoes')
const User = require('./User')

const PermissoesFuncoes = db.define('PermissoesFuncoes', {
    funcoes_id: {
        references: { model : 'Funcoes', key: 'id'},
        type: DataTypes.STRING,
        allowNull: false,
    },

    permissoes_id: {
        references: { model : 'Permissoes', key: 'id'},
        type: DataTypes.STRING,
        allowNull: false,
    },
})

Funcoes.belongsTo(User)
User.hasMany(Funcoes)

// PermissoesFuncoes.sync({force:true})

module.exports = PermissoesFuncoes