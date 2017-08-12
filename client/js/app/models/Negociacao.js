"use strict";

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, Negociacao;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            _export("Negociacao", Negociacao = function () {
                // Responsável pela Criação da Negociação, recebendo os valores e formando uma negociação

                function Negociacao(data, quantidade, valor) {
                    _classCallCheck(this, Negociacao);

                    this._data = new Date(data.getTime()); // Recebe o valor do input data digitado pelo usuário 
                    this._quantidade = quantidade; // Recebe o valor do input quantidade
                    this._valor = valor; // Recebe o valor do input valor
                    Object.freeze(this); // Congela o objeto, inpedindo que possa ser modificado fora da Classe
                }

                _createClass(Negociacao, [{
                    key: "volume",
                    get: function get() {
                        // Método usado para retornar o resultado de volume
                        var volume = this._quantidade * this._valor;
                        return volume;
                    }
                }, {
                    key: "data",
                    get: function get() {
                        // Método usado para coibir o acesso direto ao elemento data
                        return new Date(this._data.getTime());
                    }
                }, {
                    key: "quantidade",
                    get: function get() {
                        // Método usado para coibir o acesso direto ao elemento quantidade
                        return this._quantidade;
                    }
                }, {
                    key: "valor",
                    get: function get() {
                        // Método usado para coibir o acesso direto ao elemento valor
                        return this._valor;
                    }
                }]);

                return Negociacao;
            }());

            _export("Negociacao", Negociacao);
        }
    };
});