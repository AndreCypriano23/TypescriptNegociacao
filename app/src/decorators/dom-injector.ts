export function domInjector(seletor: string){

    return function(target: any, propertyKey: string){
        //tenho que ter a instancia de NegociacaoController para quando for buscar a instancia do DOM eu poder atribuir a essa propriedade
        //console.log(propertyKey);
        console.log(`Modificando prototype ${target.constructor.name} 
        e adicionando getter para a propriedade ${propertyKey}`)

        let elemento: HTMLElement; //undefined
        const getter = function() {
            if(!elemento){
                elemento = <HTMLElement>document.querySelector(seletor);//nunca vai ser nulo, vai ser HTMLElement
                
                 //se usasse arrow function daria problema pq o this nao seria dinâmico
                console.log(`buscando elemento do DOM com o deletor ${seletor} para injetar em ${propertyKey} `)
            }
            //Se já tiver o elemento, ele vai pular o if e já vai ir para baixo, como se fosse um cache, nao vai precisar fazer atribuir denovo

            return elemento;
        }

            Object.defineProperty(
                target,
                propertyKey, //peguei a propriedade
                { get: getter} //setei o getter aqui dessa propriedade aí quando forem executadas elas vão acessar esse elemento do DOM
            );
    
    }


}