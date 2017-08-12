

    const dbName = 'aluraframe'; // Recebe o nome do banco a ser criado ou atualizado no Browser
    const version = 4; // Recebe a versão do banco a ser passada para efeitos de sincronização com o Browser
    const stores = ['negociacoes']; // Recebe o nome da Store a ser verificada para criação ou atualização
    
    let connection = null; // Valor inicial para a conexão.
    
    let close = null;

    export class ConnectionFactory { // É a fábrica de conexões

        constructor() {
            
            throw new Error("ConnectionFactory não pode ser Instânciada"); // Notifica aos desenvolvedores que ConnectionFactory não pode ser instânciada e deve ser obtida através do getConnection
        }
        
        static getConnection() { // Responsável por retornar uma Promise() com a conexão desejada

            return new Promise((resolve, reject) =>{

                let openRequest = window.indexedDB.open(dbName, version); // Faz a abertura da janela para verifição do banco para atualização ou criação e sua versão.

                openRequest.onupgradeneeded = e => { // Responsável pelos processos nas stores

                    ConnectionFactory._createStores(e.target.result); // Requere o método _createStores
                };

                openRequest.onsuccess = e => {

                    if(!connection){

                        connection = e.target.result; // Verifica se a conexão já existe e retorna para a variável conexão o resultado
                        close = connection.close.bind(connection);
                        connection.close = function(){
                            throw new Error('Você não pode acessar diretamente a conexão!');
                        }
                    }

                    resolve(connection); // Retorna o sucesso na Conexão
                };

                openRequest.onerror = e => { // Retorna o possível erro de conexão

                    console.log(e.target.error);
                    reject(e.target.error.name);
                }
            }); 
        }

        static _createStores(connection) {

            stores.forEach(store => { // varre as stores e verifica uma possível atualização, exclusão, ou criação.

                if(connection.objectStoreNames.contains(store)) 
                    connection.deleteObjectStore(store);

                connection.createObjectStore(store, {autoIncrement : true});

            });

        }

        static closeConnection(){

            if(connection){
                close();
                connection = null;
            }
        }
    }