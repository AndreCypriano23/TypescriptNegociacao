import { Imprimivel } from "./imprimivel.js";

export function imprimir(...objetos: Imprimivel[]){//vou receber uma quantidade desconhecida de objetos

    for (let objeto of objetos){
        console.log(objeto.paraTexto());
    }

}