const express = require('express');
const filmeController = require('./controllers/filmeController.js');
const usuarioController = require('./controllers/usuarioController.js');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended:true }));

app.get("/", filmeController.getFilmes);
app.post("/", filmeController.addFilme);

app.get("/login", usuarioController.getLogin);
app.post("/login", usuarioController.doLogin);

app.get("/cadastro", usuarioController.getCadastro);
app.post("/cadastro", usuarioController.doCadastro);

app.listen(port, () =>{
    console.log("Rodando na porta: " +port);
});










