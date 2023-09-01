const jwt = require("jsonwebtoken");
const Sequelize = require('sequelize');
const db = require('./db.js');



const Usuario = db.define("usuario", {
    idUsuario: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    senha:{
        type: Sequelize.STRING,
        allowNull: false,
    }
},{
    timestamps: false
});


module.exports = Usuario;