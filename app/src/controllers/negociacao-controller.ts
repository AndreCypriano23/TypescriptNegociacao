import { domInjector } from '../decorators/dom-injector.js';
import { inspect } from '../decorators/inspect.js';
import { logarTempoDeExecucao } from '../decorators/logar-tempo-de-execucao.js';
import { DiasDaSemana } from '../enums/dias-da-semana.js';
import { Negociacao } from '../models/negociacao.js';
import { Negociacoes } from '../models/negociacoes.js';
import { NegociacoesService } from '../services/negociacoes-service.js';
import { imprimir } from '../utils/imprimir.js';
import { MensagemView } from '../views/mensagem-view.js';
import { NegociacoesView } from '../views/negociacoes-view.js';

export class NegociacaoController {


    @domInjector('#data') //decoratior de propriedades
    private inputData: HTMLInputElement;
    @domInjector('#quantidade')
    private inputQuantidade: HTMLInputElement;
    @domInjector('#valor')
    private inputValor: HTMLInputElement;

    private negociacoes = new Negociacoes();
    private negociacoesView = new NegociacoesView('#negociacoesView');
    private mensagemView = new MensagemView('#mensagemView');
    private negociacoesService = new NegociacoesService();


    constructor() {
        this.negociacoesView.update(this.negociacoes);
    }

    @inspect
    @logarTempoDeExecucao()
    public adiciona(): void {
        
        const negociacao = Negociacao.criaDe(
            this.inputData.value, 
            this.inputQuantidade.value,
            this.inputValor.value
        );
     
        if (!this.ehDiaUtil(negociacao.data)) {
            this.mensagemView
                .update('Apenas negociações em dias úteis são aceitas');
            return ;
        }

        this.negociacoes.adiciona(negociacao);

        imprimir(negociacao, this.negociacoes);//Só pode passar aqui todo mundo que é imprimível, que tem o extends

        this.limparFormulario();
        this.atualizaView();
        
    }

    public importaDados(): void{

        this.negociacoesService
        .obterNegociacoesDoDia()
        .then(negociacoesDeHoje => {
            //fazer um filtro p/ garantir que ele nao foi inserido
            return negociacoesDeHoje.filter(negociacaoDeHoje => {
                //Se no filter o item retornar true vai entrar, senão não
                return !this.negociacoes
                .lista()
                .some(negociacao => negociacao.ehIgual(negociacaoDeHoje));
                //método some, se ele contra a 1ª coisa que é vdd, ele para e me retorna true e para.
                //Se nao for igual eu adiciono
            });
        })
        .then(negociacoesDeHoje => {
            //agr sei que é um array de negociação
            for(let negociacao of negociacoesDeHoje){
                this.negociacoes.adiciona(negociacao); 
            }
            this.negociacoesView.update(this.negociacoes);//p atualizar a view com o dado que veio
        });
    }

    private ehDiaUtil(data: Date) {
        return data.getDay() > DiasDaSemana.DOMINGO 
            && data.getDay() < DiasDaSemana.SABADO;
    }

    private limparFormulario(): void {
        this.inputData.value = '';
        this.inputQuantidade.value = '';
        this.inputValor.value = '';
        this.inputData.focus();
    }

    private atualizaView(): void {
        this.negociacoesView.update(this.negociacoes);
        this.mensagemView.update('Negociação adicionada com sucesso');
    }
}
