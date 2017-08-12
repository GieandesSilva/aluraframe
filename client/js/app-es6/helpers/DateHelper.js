
export class DateHelper {

    constructor(){
        throw new Error("DateHelper não pode ser instanciada"); // throw lança um erro, retornando o parâmetro descrito.
    }
    
    static dataParaTexto(data) { // static Permite o acesso direto ao método através da classe, não necessitando ser instânciada
       
        return `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`;
        //data.getDate()
        //+ '/' + (data.getMonth() +1)
        //+ '/' + data.getFullYear();
    
    }

    static textoParaData(texto){
        
        if(!/^\d{2}\/?\d{2}\/?\d{4}$/.test(texto))

            throw new Error("A data precisa estar no formato dd/mm/aaaa");
        
        if(/^\d{2}\/\d{2}\/\d{4}$/.test(texto)) {

            return new Date(...texto.split('\/').reverse().map((item, indice) => item - indice % 2)); 
            // Remove os ítens e os coloca separadamente em cada posição do Array
            // .map navega pelo array passando o conteúdo, a => é uma Arrow Function. 
            // Quando tem apenas uma linha de código, pode ser construída dessa forma.

        }else if(/^\d{2}\d{2}\d{4}$/.test(texto)){

            let dataDia = texto.match(/\d{2}/);
            let dataDiaMes = texto.match(/\d{4}/);
            let dataAno = texto.match(/\d{4}$/);
            let dataMes = dataDiaMes.toString().match(/\d{2}$/);
            let texto2 = `${dataDia.toString()}/${dataMes.toString()}/${ dataAno.toString()}`;   
            
            return new Date(...texto2.split('/').reverse().map((item, indice) => item - indice % 2)); 
            // Remove os ítens e os coloca separadamente em cada posição do Array
            // .map navega pelo array passando o conteúdo, a => é uma Arrow Function. 
            // Quando tem apenas uma linha de código, pode ser construída dessa forma.
            
        }
    }
}