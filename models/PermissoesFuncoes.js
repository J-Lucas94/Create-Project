// var db = require('../db/db')

// const { Sequelize, DataTypes } = require('sequelize')
// const Funcoes = require('./Funcoes')
// const Usuario = require('./Usuario')

// const PermissoesFuncoes = db.define('PermissoesFuncoes', {
//     funcoes_id: {
//         references: { model : 'Funcoes', key: 'id'},
//         type: DataTypes.STRING,
//         allowNull: false,
//     },

//     permissoes_id: {
//         references: { model : 'Permissoes', key: 'id'},
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
// })

// Funcoes.belongsTo(Usuario)
// Usuario.hasMany(Funcoes)

// // PermissoesFuncoes.sync({force:true})

// module.exports = PermissoesFuncoes