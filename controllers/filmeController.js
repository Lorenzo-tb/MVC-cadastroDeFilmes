const Filme = require('../models/filmeModel.js');

const filmes = [];//pega do banco de dados;

function getFilmes(req, res){
    res.render("filmeView", {filmes});
}

function addFilme(req, res){
    const {titulo, sinopse, elenco, direcao, cartaz} = req.body;

    const filme = new Filme(titulo, sinopse, elenco, direcao, cartaz);

    filmes.push(filme);//envia para o banco de dados

    res.redirect('/');
}

module.exports = { getFilmes, addFilme };