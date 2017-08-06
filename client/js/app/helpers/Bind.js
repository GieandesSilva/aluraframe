class Bind{

    constructor(model, view, ...props){ // ... Rest Operator, aceita vários parâmetros a partir dele como posições de um array. 
        let proxy = ProxyFactory.create(model, props, model => view.update(model));
    
        view.update(model);

        return proxy;
    }
}

        
        
