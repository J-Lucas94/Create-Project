var db = require('../db/db')

const { Sequelize, DataTypes } = require('sequelize')

const MotivosBaixa = db.define('MotivosBaixa', {
    descricao: {
        type: DataTypes.STRING,
        allowNull: false,
    }

})

// MotivosBaixa.sync({alter:true})

module.exports = MotivosBaixa