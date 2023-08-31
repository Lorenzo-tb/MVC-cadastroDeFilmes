const md5 = require('md5');

class Usuario{
    constructor(nome, email, senha){
        this.nome = nome,
        this.email = email,
        this.senha = md5(senha);
    }
}

module.exports = Usuario;