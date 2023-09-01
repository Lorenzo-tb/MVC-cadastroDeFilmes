
const Sequelize = require('sequelize');

    const sequelize = new Sequelize("cadastroFilmes", "root", "", {
    host: "127.0.0.1",
    dialect: "mysql"
})

sequelize.authenticate()
.then((resp)=>{
    console.log("conectou ao banco!");
}).catch((err)=>{
    console.log("Erro ao conectar com o banco: "+err)
})

module.exports = sequelize;