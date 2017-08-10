class NegociacaoController{ // Responsável pela ação de capturar o conteúdo do FORM e gravá-lo na tabela

    constructor() {

        let $ = document.querySelector.bind(document); // converte o método document.querySelctor na variável $, só é possível graças ao .bind que permite que o document não perca seu contexto e continue como objeto mesmo após ser convertido em $.
        this._ordemAtual = '';
        this._inputData = $("#data");
        this._inputQuantidade = $("#quantidade");
        this._inputValor = $("#valor");

        this._listaNegociacoes = new Bind(new ListaNegociacoes(), new NegociacoesView($("#negociacoesView")), 'adiciona', 'esvazia', 'ordena', 'inverteOrdem');

        this._mensagem = new Bind(new Mensagem, new MensagemView($("#mensagemView")), 'texto');

        ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.listaTodos())
            .then(negociacoes => 
                negociacoes.forEach(negociacao => 
                    this._listaNegociacoes.adiciona(negociacao)
                )
            ).catch(erro => {

                console.log(erro);
                this._mensagem.texto = error;
            })
    }
    
    adiciona(event) {
        
        event.preventDefault();
        // Uma instância de negociação, responsável por receber os valores através do constructor e montar o objeto.

        ConnectionFactory
            .getConnection()
            .then(connection =>{

                let negociacao = this._criaNegociacao();
                new NegociacaoDao(connection)
                    .adiciona(negociacao)
                    .then(() => {

                        this._listaNegociacoes.adiciona(negociacao);
                        this._mensagem.texto = 'Negociação adicionada com sucesso!!!';
                        this._limpaFormulario();            
                    })
                    
            })
            .catch(erro => this._mensagem.texto = erro);

    }

    importaNegociacoes() {
             
        let service = new NegociacaoService();
        service
            .obterNegociacoes()
            .then(negociacoes => negociacoes.forEach(negociacao => {
                this._listaNegociacoes.adiciona(negociacao);
                this._mensagem.texto = 'Negociações do período importadas'   
            }))
            .catch(erro => this._mensagem.texto = erro);               
    }  

    apaga(){

        ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.apagaTodos())
            .then(mensagem => {

                this._mensagem.texto = mensagem;
                this._listaNegociacoes.esvazia();
            });
    }

    _criaNegociacao() {
 
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)
        );
    }

    _limpaFormulario() {

        this._inputData.value = "";
        this._inputData.focus();
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
    }

    ordena(coluna) {

        if(this._ordemAtual == coluna) {

            this._listaNegociacoes.inverteOrdem();
        }else {

            this._listaNegociacoes.ordena((a,b) => a[coluna] - b[coluna]);
        }
        this._ordemAtual = coluna;
    }
}