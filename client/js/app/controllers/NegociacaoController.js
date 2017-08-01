class NegociacaoController{ // Responsável pela ação de capturar o conteúdo do FORM e gravá-lo na tabela

    constructor() {

        let $ = document.querySelector.bind(document); // converte o método document.querySelctor na variável $, só é possível graças ao .bind que permite que o document não perca seu contexto e continue como objeto mesmo após ser convertido em $.
        this._inputData = $("#data");
        this._inputQuantidade = $("#quantidade");
        this._inputValor = $("#valor");
        this._listaNegociacoes = new ListaNegociacoes();

        let negociacaoDOM = $("#negociacoesView");
        this._negociacoesView = new NegociacoesView(negociacaoDOM);
        this._negociacoesView.update(this._listaNegociacoes);

        let mensagemDOM = $("#mensagemView");
        this._mensagem = new Mensagem();
        this._mensagemView = new MensagemView(mensagemDOM);
        this._mensagemView.update(this._mensagem);
    }
    
    adiciona(event) {
        
        event.preventDefault();
        // Uma instância de negociação, responsável por receber os valores através do constructor e montar o objeto.

        this._listaNegociacoes.adiciona(this._criaNegociacao());
        this._negociacoesView.update(this._listaNegociacoes);
        
        this._mensagem.texto = 'Negociação adicionada com sucesso!!!';
        this._mensagemView.update(this._mensagem);

        this._limpaFormulario();
    }

    _criaNegociacao() {
 
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        );
    }

    _limpaFormulario() {

        this._inputData.value = "";
        this._inputData.focus();
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
    }
}