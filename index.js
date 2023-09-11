require('dotenv').config()
const express = require('express');
const filmeController = require('./controllers/filmeController');
const usuarioController = require('./controllers/usuarioController');
const homeController = require('./controllers/homeController');
const methodOverride = require('method-override');
const multer = require('multer');
const upload = multer({ dest: './public/cartaz' });



const app = express();
const port = 3000;

app.use(methodOverride('_method'))
const session = require('express-session');

app.use(express.json());

app.use(session({
    secret: "cadastroFilmesMVC",
    resave: true,
    saveUninitialized: true
}));

app.use('/public', express.static('public'));

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
});
app.post("/cadastroFilmes", upload.single('cartaz'), filmeController.addFilme);

app.get("/listarFilmes", (req, res, next) =>{
    if(req.session.token){
        filmeController.getFilmes(req, res, next);
    }
    else{
        res.redirect("/login");
    }
});
app.post("/listarFilmes", (req, res, next) =>{
    req.session.titulo = req.body.titulo;
    res.redirect("/editarFilme");
});

app.get("/editarFilme", (req, res, next) =>{
    if(req.session.token){
        filmeController.getEditarFilme(req, res, next);
    }
    else{
        res.redirect("/login");
    }
});
app.put("/editarFilme", (req, res) =>{
    console.log("veio aqui no put");
    filmeController.putEditarFilme(req, res);
});
app.delete("/editarFilme", (req, res) =>{
    console.log("veio aqui no delete");
    filmeController.deleteFilme(req, res);
});

app.get("/login", usuarioController.getLogin);
app.post("/login", usuarioController.doLogin);

app.get("/cadastro", usuarioController.getCadastro);
app.post("/cadastro", usuarioController.doCadastro);

app.post("/sair", usuarioController.sair);

app.listen(port, () =>{
    console.log("Rodando na porta: " +port);
});










