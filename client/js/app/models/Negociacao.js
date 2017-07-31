class Negociacao { // Responsável pela Criação da Negociação, recebendo os valores e formando uma negociação
    
    constructor(data, quantidade, valor){
        this._data = new Date(data.getTime()); // Recebe o valor do input data digitado pelo usuário 
        this._quantidade = quantidade; // Recebe o valor do input quantidade
        this._valor = valor; // Recebe o valor do input valor
        Object.freeze(this); // Congela o objeto, inpedindo que possa ser modificado fora da Classe
    }

    get volume(){ // Método usado para retornar o resultado de volume
        var volume = this._quantidade * this._valor;
        return volume;
    }

    get data(){ // Método usado para coibir o acesso direto ao elemento data
        return new Date(this._data.getTime());
    }

    get quantidade(){ // Método usado para coibir o acesso direto ao elemento quantidade
        return this._quantidade;
    }

    get valor(){ // Método usado para coibir o acesso direto ao elemento valor
        return this._valor;
    }

}