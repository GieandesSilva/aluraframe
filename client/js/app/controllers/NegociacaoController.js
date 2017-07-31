class NegociacaoController{ // Responsável pela ação de capturar o conteúdo do FORM e gravá-lo na tabela

    constructor() {

        let $ = document.querySelector.bind(document); // converte o método document.querySelctor na variável $, só é possível graças ao .bind que permite que o document não perca seu contexto e continue como objeto mesmo após ser convertido em $.
        this._inputData = $("#data");
        this._inputQuantidade = $("#quantidade");
        this._inputValor = $("#valor");

    }
    
    adiciona(event) {
        
        event.preventDefault();

        let data = new Date(
            ...this._inputData.value // ... é o expred operator que passa os ítens do Array como parametros, cada ítem em sequência, iniciando do 0
            .split('-') // Remove os ítens e os coloca separadamente em cada posição do Array
            .map((item, indice) => item - indice % 2) // .map navega pelo array passando o conteúdo, a => é uma Arrow Function, Quando tem apenas uma linha de código, pode ser construída dessa forma.
        );

        // Uma instância de negociação, responsável por receber os valores através do constructor e montar o objeto.
        let negociacao = new Negociacao(
            data,
            this._inputQuantidade.value,
            this._inputValor.value
        );

        console.log(negociacao);
    }
}