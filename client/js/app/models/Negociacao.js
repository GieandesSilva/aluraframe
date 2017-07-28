class Negociacao {
    
    constructor(data, quantidade, valor){
        this.data = data;
        this.quantidade = quantidade;
        this.valor = valor;
    }

    obtemVolume(){
        var volume = this.quantidade * this.valor;
        return volume;
    }
}