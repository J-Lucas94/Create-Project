var db = require('../db/db')

const { Sequelize, DataTypes } = require('sequelize')

const ViasAdmissoes = db.define('ViasAdmissoes', {
    descricao: {
        type: DataTypes.STRING,
        allowNull: false,
    }

})

// db.sync({force:true})

module.exports = ViasAdmissoes