const Sequelize = require('sequelize');
const db = require('./db.js');

const Filme = db.define("filme", {
    idFilme: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    titulo: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    sinopse: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    elenco: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    direcao: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    cartaz: {
        type: Sequelize.BLOB('long'),
        allowNull: false,
    }
},{
    timestamps: false
});


module.exports = Filme;