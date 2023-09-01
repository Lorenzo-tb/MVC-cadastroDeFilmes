const FilmeModel = require('../models/filmeModel.js');

let message = "";

async function getFilmes(req, res, next){
    const filmes = await FilmeModel.findAll();
    res.render("filmeView", {filmes});
}


function getCadastroFilmes(req, res, next){
    res.render("cadastroFilmeView", {message});
}


async function addFilme(req, res){
    const data = req.body;
    
    if(data.titulo == "" || data.sinopse == "" || data.elenco == "" || data.direcao == "" || data.cartaz == ""){
        message = "Todos os campos devem ser preenchidos!"
        res.render("cadastroFilmeView", {message});
    }else{
        console.log(data);
        await FilmeModel.create(data)
        .then(() =>{
            message = "Filme cadastrado com sucesso";
            res.render("cadastroFilmeView", {message});
        }).catch((err)=>{
            if(err){
                console.log(err);
                message = "Erro ao adicionar Filme!"
        res.render("cadastroFilmeView", {message});
            }
        })    
    }
    
}

module.exports = { getFilmes, getCadastroFilmes, addFilme };