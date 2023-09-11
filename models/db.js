const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.MYSQLDATABASE, process.env.MYSQLUSER, process.env.MYSQLPASSWORD, {
    host: process.env.MYSQLHOST,
    dialect: "mysql",
    port: process.env.MYSQLPORT,
    url: process.env.MYSQL_URL
});


sequelize.authenticate()
.then((resp)=>{
    console.log("conectou ao banco!");
}).catch((err)=>{
    console.log("Erro ao conectar com o banco: "+err)
});

module.exports = sequelize;