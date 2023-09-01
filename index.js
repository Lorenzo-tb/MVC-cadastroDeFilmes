const express = require('express');
const filmeController = require('./controllers/filmeController.js');
const usuarioController = require('./controllers/usuarioController.js');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = 3000;

const session = require('express-session');

const { auth } = require('./middlewares/auth.js');

app.use(express.json());

app.use(session({
    secret: "cadastroFilmesMVC",
    resave: true,
    saveUninitialized: true
}))

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended:true }));

app.get("/", auth, filmeController.getFilmes);
app.post("/", filmeController.addFilme);

app.get("/login", usuarioController.getLogin);
app.post("/login", usuarioController.doLogin);

app.get("/cadastro", usuarioController.getCadastro);
app.post("/cadastro", usuarioController.doCadastro);

app.listen(port, () =>{
    console.log("Rodando na porta: " +port);
});










