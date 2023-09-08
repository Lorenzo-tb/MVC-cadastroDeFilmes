const UsuarioModel = require('../models/usuarioModel.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let errorMassege = "";

function getLogin(req, res){//get
    errorMassege = "";
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
        errorMassege = "Usuario ou senha incorretos!"
        res.render("loginView", {errorMassege});
    }
    else if(!(await bcrypt.compare(data.senha, user.senha))){
        errorMassege = "Usuario ou senha incorretos!"
        res.render("loginView", {errorMassege});
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
    errorMassege = "";
    console.log(errorMassege)
    res.render("cadastroView", {errorMassege});
}

async function doCadastro (req, res){//post
    const data = req.body;
    console.log(data.senha)
    console.log(data.confirmarSenha)
    if(data.senha != data.confirmarSenha){
        errorMassege = "As senha devem ser iguais!"
        console.log("senhas diferentes");
        res.render("cadastroView", {errorMassege});
    }else if(data.nome == "" || data.email == "" || data.senha == ""){
        errorMassege = "Todos os campos devem estar preenchidos!"
        console.log("senhas diferentes");
        res.render("cadastroView", {errorMassege});
    }else{
        data.senha = await bcrypt.hash(data.senha, 8);
    
        console.log(data);
        await UsuarioModel.create(data)
        .then(() =>{
            
            const user = UsuarioModel.findOne({
                atributer: ['idUsuario', 'nome', 'email', 'senha'],
                where: {
                    email: data.email,
                }
            });

            let token = jwt.sign({id: user.idUsuario}, process.env.SECRET, {
                expiresIn: '1d' //expira em um dia
            });
        
            req.session.token = token;
            req.session.idUsuario = user.idUsuario;
    
            res.redirect('/');
        }).catch((err)=>{
            if(err){
                errorMassege = "Falha ao cadastrar o usuario!"
                console.log(err);
                res.render("cadastroView", {errorMassege});
            }
        })
        }
    
}

function sair(req, res){
    req.session.token = "";
    req.session.idUsuario = "";
    res.redirect("/login");
}



module.exports = { getLogin, doLogin, getCadastro, doCadastro, sair};