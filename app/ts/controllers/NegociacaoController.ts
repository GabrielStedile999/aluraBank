import { NegociacoesView, MensagemView } from "../Views/index.js";
import { Negociacoes, Negociacao } from "../Models/index.js";
import { domInject, throttle} from "../helpers/decorators/index.js";
import { NegociacaoService} from "../services/index.js";
import { imprime} from "../helpers/index.js";

export class NegociacaoController {

    @domInject("#data")
    private _inputData: JQuery;

    @domInject("#quantidade")
    private _inputQuantidade: JQuery;

    @domInject("#valor")
    private _inputValor: JQuery;
    private _negocicacoes = new Negociacoes();
    private _negociacoesView = new NegociacoesView("#negociacoesView");
    private _mensagemView = new MensagemView("#mensagemView");

    private _negociacaoService = new NegociacaoService();

    constructor() {
        this._negociacoesView.update(this._negocicacoes);
    }

    @throttle()
    adiciona() {

        let data = new Date(this._inputData.val().toString().replace(/-/g, ","));

        if(!this._ehDiaUtil(data)) {

            this._mensagemView.update("Somente negociações em dias úteis, por favor");
            return;
        }

        const negociacao = new Negociacao(
            data,
            parseInt(this._inputQuantidade.val().toString()),
            parseFloat(this._inputValor.val().toString())
        );

        this._negocicacoes.adiciona(negociacao);

        imprime(negociacao, this._negocicacoes);

        this._negociacoesView.update(this._negocicacoes);
        this._mensagemView.update("Negociação adicionada com sucesso!");
    }

    private _ehDiaUtil(data: Date) {

        return data.getDay() != DiaDaSemana.Sabado && data.getDay() != DiaDaSemana.Domingo;
    }

    @throttle()
    importaDados() {

        this._negociacaoService
            .obterNegociacoes(res => {
                if(res.ok) {
                    return res;
                } else {
                    throw new Error(res.statusText);
                }
            })
            .then(negociacoesParaImportar => {

                const negociacoesJaImportadas = this._negocicacoes.paraArray();

                negociacoesParaImportar
                    .filter(negociacao =>
                        !negociacoesJaImportadas.some(jaImportadas =>
                            negociacao.ehIgual(jaImportadas)))
                    .forEach(negociacao =>
                    this._negocicacoes.adiciona(negociacao));

                this._negociacoesView.update(this._negocicacoes);
            })
            .catch(err => this._mensagemView.update(err.message));
    }
}

enum DiaDaSemana {

    Domingo,
    Segunda,
    Terca,
    Quarta,
    Quinta,
    Sexta,
    Sabado
}