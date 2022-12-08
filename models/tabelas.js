var db = require('../db/db')

const { Sequelize, DataTypes } = require('sequelize')

const Tabelas = db.define('Tabelas', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

const Campos = db.define('Campos', {
    id_tabela: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    primaryKey: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    allowNull: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },

    defaultValue: {
        type: DataTypes.BOOLEAN,
    },

    sequencia: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    id_folder: {
        type: DataTypes.STRING,
        allowNull: true,
    },  

    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    tipo:{
        type: DataTypes.STRING,
        allowNull: false,
    }
})

//Campos.sync({alter:true})

module.exports = {Campos, Tabelas}