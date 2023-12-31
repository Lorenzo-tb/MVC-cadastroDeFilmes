const FilmeModel = require('../models/filmeModel.js');

let message = "";

async function getFilmes(req, res, next){
    const filmes = await FilmeModel.findAll();
    
    res.render("filmeView", {filmes});
}

async function getEditarFilme(req, res, next){
    message = "";
    const filme = await FilmeModel.findOne({
        atributer: ['idFilme', 'titulo', 'sinopse', 'elenco', 'direcao', 'cartaz'],
        where: {
            titulo: req.session.titulo,
        }
    });
    res.render("editarFilmesView", { filme, message });
}

async function putEditarFilme(req, res){
    const data = req.body;
    if(data.titulo == "" || data.sinopse == "" || data.elenco == "" || data.direcao == ""){
        message = "Todos os campos devem ser preenchidos!"
        const filme = await FilmeModel.findOne({
            atributer: ['idFilme', 'titulo', 'sinopse', 'elenco', 'direcao', 'cartaz'],
            where: {
                titulo: req.session.titulo,
            }
        });
        res.render("editarFilmesView", { filme, message });
    }
    else{
        await FilmeModel.update(data, {
            where: {
                idFilme: data.id
            }
        })
        .then(result => {
            res.redirect("listarFilmes");
        })
        .catch(err =>{
            res.render("editarFilmesView", { filme, message });
        })
    }
    
}

async function deleteFilme(req, res){
    const data = req.body;
    console.log(data);
    console.log("TA CHEGANDO AQUI NO DELETE!");

    await FilmeModel.destroy({
        where: {
            idFilme: data.id
        }
    })
    .then(result => {
        message = "Filme exluido";
        res.redirect("listarFilmes");
    })
    .catch(err =>{
        message = "Erro ao excluir o filme!";
        const filme = [];
        res.render("editarFilmesView", { filme, message });
    })
}

function getCadastroFilmes(req, res, next){
    message = "";
    res.render("cadastroFilmeView", {message});
}

async function addFilme(req, res){
    const body = req.body;
    const cartaz = req.file.filename;
    if(body.titulo == "" || body.sinopse == "" || body.elenco == "" || body.direcao == "" || cartaz == ""){
        message = "Todos os campos devem ser preenchidos!"
        res.render("cadastroFilmeView", {message});
    
    
    }else{
        console.log(body);
        const data = {
            titulo: body.titulo,
            sinopse: body.sinopse,
            elenco: body.elenco,
            direcao: body.direcao,
            cartaz: cartaz
        }
        
        console.log(data);
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

module.exports = { getFilmes, getEditarFilme, putEditarFilme, deleteFilme, getCadastroFilmes, addFilme };