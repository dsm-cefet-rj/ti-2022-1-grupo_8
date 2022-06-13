class Usuario {
    constructor(id,nome,email,senha,pedidos) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.pedidos = pedidos;
        this.admin = false;
    }
};

class Ingrediente {
    constructor(id,imagem,nome,preco,descricao,pesoPorcao,usados) {
        this.id = id;
        this.nome = nome;
        this.preco = preco;
    }
};

class Pizza{
    constructor(id,nome,descricao,imagem,ingredientes,quant_comprada) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.imagem = imagem;
        this.ingredientes = ingredientes;
        this.quant_comprada = quant_comprada;
    }
}

class Produto{
    constructor(id,nome,descricao,imagem,preco,quant_comprada) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.imagem = imagem;
        this.preco = preco;
        this.quant_comprada = quant_comprada;
    }
}

export {Usuario,Ingrediente,Pizza,Produto};