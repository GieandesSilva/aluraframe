'use strict';

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, dbName, version, stores, connection, close, ConnectionFactory;

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

            dbName = 'aluraframe';
            version = 4;
            stores = ['negociacoes'];
            connection = null;
            close = null;

            _export('ConnectionFactory', ConnectionFactory = function () {
                // É a fábrica de conexões

                function ConnectionFactory() {
                    _classCallCheck(this, ConnectionFactory);

                    throw new Error("ConnectionFactory não pode ser Instânciada"); // Notifica aos desenvolvedores que ConnectionFactory não pode ser instânciada e deve ser obtida através do getConnection
                }

                _createClass(ConnectionFactory, null, [{
                    key: 'getConnection',
                    value: function getConnection() {
                        // Responsável por retornar uma Promise() com a conexão desejada

                        return new Promise(function (resolve, reject) {

                            var openRequest = window.indexedDB.open(dbName, version); // Faz a abertura da janela para verifição do banco para atualização ou criação e sua versão.

                            openRequest.onupgradeneeded = function (e) {
                                // Responsável pelos processos nas stores

                                ConnectionFactory._createStores(e.target.result); // Requere o método _createStores
                            };

                            openRequest.onsuccess = function (e) {

                                if (!connection) {

                                    connection = e.target.result; // Verifica se a conexão já existe e retorna para a variável conexão o resultado
                                    close = connection.close.bind(connection);
                                    connection.close = function () {
                                        throw new Error('Você não pode acessar diretamente a conexão!');
                                    };
                                }

                                resolve(connection); // Retorna o sucesso na Conexão
                            };

                            openRequest.onerror = function (e) {
                                // Retorna o possível erro de conexão

                                console.log(e.target.error);
                                reject(e.target.error.name);
                            };
                        });
                    }
                }, {
                    key: '_createStores',
                    value: function _createStores(connection) {

                        stores.forEach(function (store) {
                            // varre as stores e verifica uma possível atualização, exclusão, ou criação.

                            if (connection.objectStoreNames.contains(store)) connection.deleteObjectStore(store);

                            connection.createObjectStore(store, { autoIncrement: true });
                        });
                    }
                }, {
                    key: 'closeConnection',
                    value: function closeConnection() {

                        if (connection) {
                            close();
                            connection = null;
                        }
                    }
                }]);

                return ConnectionFactory;
            }());

            _export('ConnectionFactory', ConnectionFactory);
        }
    };
});