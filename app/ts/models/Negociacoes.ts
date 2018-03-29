import { Negociacao } from "./Negociacao.js";
import { Imprimivel } from "./Imprimivel.js";


export class Negociacoes extends Imprimivel{

    private _negociacoes: Array<Negociacao> = [];

    adiciona(negociacao: Negociacao) {

        this._negociacoes.push(negociacao);
    }

    paraArray(): Negociacao[] {

        return ([] as Negociacao[]).concat(this._negociacoes);
    }

    paraTexto(): void {
        console.log("Impressão");
        console.log(JSON.stringify(this._negociacoes));

    }

}