const express = require('express');
const filmeController = require('./controllers/filmeController.js');
const usuarioController = require('./controllers/usuarioController.js');
const homeController = require('./controllers/homeController.js')
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = 3000;

const session = require('express-session');

app.use(express.json());

app.use(session({
    secret: "cadastroFilmesMVC",
    resave: true,
    saveUninitialized: true
}))

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended:true }));

app.get("/", (req, res, next) =>{
    if(req.session.token){
        homeController.gethome(req, res, next);
    }
    else{
        res.redirect("/login");
    }
});

app.get("/cadastroFilmes", (req, res, next) =>{
    if(req.session.token){
        filmeController.getCadastroFilmes(req, res, next);
    }
    else{
        res.redirect("/login");
    }
})
app.post("/cadastroFilmes", filmeController.addFilme);

app.get("/listarFilmes", (req, res, next) =>{
    if(req.session.token){
        filmeController.getFilmes(req, res, next);
    }
    else{
        res.redirect("/login");
    }
});

app.get("/login", usuarioController.getLogin);
app.post("/login", usuarioController.doLogin);

app.get("/cadastro", usuarioController.getCadastro);
app.post("/cadastro", usuarioController.doCadastro);

app.listen(port, () =>{
    console.log("Rodando na porta: " +port);
});










