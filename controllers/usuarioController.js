const Usuario = require('../models/usuarioModel.js');

const usuarios = [];//puxa do banco de dados
let errorMassege = "";


function procurar(usuario){
    for(let i=0; i<usuarios.length; i++){
        if(usuario.email == usuarios[i].email && usuario.senha == usuarios[i].senha){
            return true;
            
        }
        return false;
    }
}


function getLogin(req, res){//get

    res.render("loginView", {errorMassege});
}

function doLogin(req, res){//post
    const {email, senha} = req.body;
    const usuario = new Usuario(null, email, senha);

    if(procurar(usuario)){
        res.redirect('/');
    }
    else{
        errorMassege = "Credenciais invalidas!";
        res.render("loginView", {errorMassege});
    }

}

function getCadastro(req, res){//get
    res.render("cadastroView", {errorMassege});
}

function doCadastro(req, res){//post
    const {nome, email, senha} = req.body;
    const usuario = new Usuario(nome, email, senha);

    if(procurar(usuario)){
        errorMassege = "Usuario ja cadastrado"
        res.redirect('/cadastro');
    }
    else{
        usuarios.push(usuario);
        res.redirect('/');
    }
    
}



module.exports = { getLogin, doLogin, getCadastro, doCadastro};