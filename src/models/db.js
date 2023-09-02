
const Sequelize = require('sequelize');

    const sequelize = new Sequelize("railway", "root", "OK6mOtcikyuu5CrxyzMR", {
    host: "containers-us-west-153.railway.app",
    dialect: "mysql",
    port: 5556,
    url: "mysql://root:OK6mOtcikyuu5CrxyzMR@containers-us-west-153.railway.app:5556/railway"
})

sequelize.authenticate()
.then((resp)=>{
    console.log("conectou ao banco!");
}).catch((err)=>{
    console.log("Erro ao conectar com o banco: "+err)
})

module.exports = sequelize;