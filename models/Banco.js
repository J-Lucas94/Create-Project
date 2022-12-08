var db = require('../db/db')
var Dicionario = require('./tabelas')

const { Sequelize, DataTypes } = require('sequelize')
var defines = {}
async function Tabelas() {
    var result = await Dicionario.Tabelas.findAll({ raw: true })
    return result
}

async function Campos(id_tabela) {
    var campos = {}
    var sx3 = await Dicionario.Campos.findAll({ raw: true, where: { id_tabela: id_tabela } })

    sx3.map((campo) => {

        campos[campo.nome] = {
            type: DataTypes[campo.tipo],
            allowNull: true,
            primaryKey: campo.primaryKey===1,
        }
    })
    return campos
}
Promise.all([Tabelas()]).then(tabelas => {
    tabelas[0].map((tabela)=>{
        Promise.all([Campos(tabela.id)]).then(resultado => {
            var Define = db.define(tabela.nome,resultado[0],
                {
                    freezeTableName:true,
                    paranoid: true,
                    deletedAt: 'deletedAt'
                })
            // Define.sync({ alter: true })
            defines[tabela.nome] = Define
        })
    })
})
module.exports = defines

