class View{

    constructor(elemento) {
        
        this._elemento = elemento;
    }

    template(){
        
        throw Error = " template deve ser implementado nas Classes filhas de View";
    }

    update(model) {        
        this._elemento.innerHTML = this.template(model);
    }    
}