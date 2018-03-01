System.register(["../Views/index.js", "../Models/index.js"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var index_js_1, index_js_2, NegociacaoController;
    return {
        setters: [
            function (index_js_1_1) {
                index_js_1 = index_js_1_1;
            },
            function (index_js_2_1) {
                index_js_2 = index_js_2_1;
            }
        ],
        execute: function () {
            NegociacaoController = class NegociacaoController {
                constructor() {
                    this._negocicacoes = new index_js_2.Negociacoes();
                    this._negociacoesView = new index_js_1.NegociacoesView("#negociacoesView");
                    this._mensagemView = new index_js_1.MensagemView("#mensagemView");
                    this._inputData = $("#data");
                    this._inputQuantidade = $("#quantidade");
                    this._inputValor = $("#valor");
                    this._negociacoesView.update(this._negocicacoes);
                }
                adiciona(event) {
                    event.preventDefault();
                    const negociacao = new index_js_2.Negociacao(new Date(this._inputData.val().toString().replace(/-/g, ",")), parseInt(this._inputQuantidade.val().toString()), parseFloat(this._inputValor.val().toString()));
                    this._negocicacoes.adiciona(negociacao);
                    this._negociacoesView.update(this._negocicacoes);
                    this._mensagemView.update("Negociação adicionada com sucesso!");
                }
            };
            exports_1("NegociacaoController", NegociacaoController);
        }
    };
});
