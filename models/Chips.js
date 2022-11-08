var db = require('../db/db')

const { Sequelize, DataTypes } = require('sequelize')

const Chips = db.define('Chips', {
    codigo: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    status : {
        type: DataTypes.STRING,
        allowNull: false,
    }

})

// Chips.sync({alter:true})

module.exports = Chips