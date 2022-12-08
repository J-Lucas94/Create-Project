// var db = require('../db/db')
// var Dicionario = require('../models/tabelas')

// const { Sequelize, DataTypes } = require('sequelize')
// var defines = {}
// async function Tabelas() {
//     var result = await Dicionario.Tabelas.findAll({ raw: true })
//     return result
// }

// async function Campos(id_tabela) {
//     var campos = {}
//     var sx3 = await Dicionario.Campos.findAll({ raw: true, where: { id_tabela: id_tabela } })

//     sx3.map((campo) => {

//         campos[campo.nome] = {
//             type: DataTypes[campo.tipo],
//             allowNull: true,
//             primaryKey: campo.primaryKey===1,
//         }
//     })
//     return campos
// }
// Promise.all([Tabelas()]).then(tabelas => {
//     console.log(tabelas[0])
//     tabelas[0].map((tabela)=>{
//         console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',tabela.id)
//         Promise.all([Campos(tabela.id)]).then(resultado => {
//             var Clientes = db.define(tabela.nome,resultado[0])
//             Clientes.sync({ alter: true })
//             defines[tabela.nome] = Clientes
//         })
//     })
// })
// module.exports = defines

