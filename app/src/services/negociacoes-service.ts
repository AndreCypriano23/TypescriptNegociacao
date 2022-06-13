import { NegociacoesDoDia } from "../interfaces/negociacao-do-dia.js";
import { Negociacao } from "../models/negociacao.js";

export class NegociacoesService {

    public obterNegociacoesDoDia(): Promise<Negociacao[]> {
        //A negociacao antiga vai ser convertida para uma Negociacao do Dia

        //Fetch API/Promisses
        return fetch('http://localhost:8080/dados') //operação assíncrona, então usa o then, e o res é de resposta do back-end
            .then(res => {
                return res.json();//converti essa resposta p/ um obj JS Json
            })
            .then((dados: NegociacoesDoDia[]) => {
                return dados.map(dado => {//resultado disponível que estará pronto na próx chamada do then 
                    return new Negociacao(new Date(), dado.vezes, dado.montante)
                })
            });
    }

}