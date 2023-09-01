const UsuarioModel = require('../models/usuarioModel.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let errorMassege = "";

function getLogin(req, res){//get
    res.render("loginView", {errorMassege});
}

async function doLogin(req, res){//post
    const data = req.body;

    const user = await UsuarioModel.findOne({
        atributer: ['idUsuario', 'nome', 'email', 'senha'],
        where: {
            email: data.email,
        }
    });

    if(user === null){
        errorMassege = "Usuario nao encontrado!"
        res.redirect('/login');
    }
    else if(!(await bcrypt.compare(data.senha, user.senha))){
        errorMassege = "Usuario ou senha incorretos!"
        res.redirect('/login');
    }
    else{
        let token = jwt.sign({id: user.idUsuario}, process.env.SECRET, {
            expiresIn: '1d' //expira em um dia
        });
    
        req.session.token = token;
        req.session.idUsuario = user.idUsuario;

        res.redirect('/');
    }
}

function getCadastro(req, res){//get
    res.render("cadastroView", {errorMassege});
}

async function doCadastro (req, res){//post
    const data = req.body;
    data.senha = await bcrypt.hash(data.senha, 8);
    
    console.log(data);
    await UsuarioModel.create(data)
    .then(() =>{
        errorMassege = "usuario cadastrado!"
        res.redirect('/login');
    }).catch((err)=>{
        if(err){
            errorMassege = "Falha ao cadastrar o usuario!"
            console.log(err);
            res.redirect('/cadastro');
        }
    })
}



module.exports = { getLogin, doLogin, getCadastro, doCadastro};