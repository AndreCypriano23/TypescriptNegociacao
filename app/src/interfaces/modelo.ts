import { Imprimivel } from "../utils/imprimivel.js";
import { Comparavel } from "./comparavel.js";

export interface Modelo<T> extends Imprimivel, Comparavel<T>{
    //Uma classe só pode extender outra classe, nao tem herança multipla em JS
    //mas uma interface pode extender quantas outras interfaces ela quiser na aplicação
    //O comparável vai receber o T passado para o Objeto

    


}