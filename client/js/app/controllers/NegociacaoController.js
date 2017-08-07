class NegociacaoController{ // Responsável pela ação de capturar o conteúdo do FORM e gravá-lo na tabela

    constructor() {

        let $ = document.querySelector.bind(document); // converte o método document.querySelctor na variável $, só é possível graças ao .bind que permite que o document não perca seu contexto e continue como objeto mesmo após ser convertido em $.
        this._inputData = $("#data");
        this._inputQuantidade = $("#quantidade");
        this._inputValor = $("#valor");

        this._listaNegociacoes = new Bind(new ListaNegociacoes(), new NegociacoesView($("#negociacoesView")), 'adiciona', 'esvazia');

        this._mensagem = new Bind(new Mensagem, new MensagemView($("#mensagemView")), 'texto');
    }
    
    adiciona(event) {
        
        event.preventDefault();
        // Uma instância de negociação, responsável por receber os valores através do constructor e montar o objeto.

        this._listaNegociacoes.adiciona(this._criaNegociacao());
        
        this._mensagem.texto = 'Negociação adicionada com sucesso!!!';

        this._limpaFormulario();
    }

    importaNegociacoes() {

        let service = new NegociacaoService();

        Promise.all(
            [
                service.obterNegociacoesDaSemana(),
                service.obterNegociacoesDaSemanaAnterior(),
                service.obterNegociacoesDaSemanaRetrasada(),
            ]
        ).then(negociacoes =>{
            negociacoes
            .reduce((arrayAchatado, array) => arrayAchatado.concat(array, []))
                .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                this._mensagem.texto = "Negociações importadas com sucesso";
        }).catch(erro => this._mensagem.texto = erro);
        /*
        service.obterNegociacoesDaSemana()
            .then(negociacoes => {
                negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                this._mensagem.texto = "Negociações da Semana Obtidas com Sucesso";
            })
            .catch(erro => this._mensagem.texto = erro);

        service.obterNegociacoesDaSemanaAnterior()
            .then(negociacoes => {
                negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                this._mensagem.texto = "Negociações da Semana Anterior Obtidas com Sucesso";
            })
            .catch(erro => this._mensagem.texto = erro);

        service.obterNegociacoesDaSemanaRetrasada()
            .then(negociacoes => {
                negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                this._mensagem.texto = "Negociações da Semana Retrasada Obtidas com Sucesso";
            })
            .catch(erro => this._mensagem.texto = erro);
            */
            /*
        service.obterNegociacoesDaSemana((erro, negociacoes) => {
            
            if(erro) {
                this._mensagem.texto = erro;
                return;
            }

            negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
            this._mensagem.texto = 'Negociações importadas com sucesso!!!';

        });
        */
    }

    apaga(){

        this._listaNegociacoes.esvazia();

        this._mensagem.texto = "Negociações apagadas com sucesso!!!";
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