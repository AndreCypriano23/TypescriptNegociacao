export function logarTempoDeExecucao(emSegundos: boolean = false){

    return function(
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    )
    {
        const metodoOriginal = descriptor.value; //guardei o método original
        descriptor.value = function(...args: any[]){//aqui vou sobrescrever o comportamento do método original

            let divisor = 1;
            let unidade = 'milisegundos';
            if(emSegundos){
                divisor = 1000;
                unidade = 'segundos';
            }

            const t1 = performance.now();//performance é variavel global do navegador
            //chamar o método original
            const retorno = metodoOriginal.apply(this, args);//this da classe que for usar e o args sao os valores do array, parametros

            const t2 = performance.now(); 
            console.log(`${propertyKey}, tempo de execução: ${( t2-t1/divisor )} ${unidade}`)
            retorno
        };

        return descriptor;
    }

}