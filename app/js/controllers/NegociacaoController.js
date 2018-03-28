System.register(["../Views/index.js", "../Models/index.js", "../helpers/decorators/index.js", "../services/index.js"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var index_js_1, index_js_2, index_js_3, index_js_4, NegociacaoController, DiaDaSemana;
    return {
        setters: [
            function (index_js_1_1) {
                index_js_1 = index_js_1_1;
            },
            function (index_js_2_1) {
                index_js_2 = index_js_2_1;
            },
            function (index_js_3_1) {
                index_js_3 = index_js_3_1;
            },
            function (index_js_4_1) {
                index_js_4 = index_js_4_1;
            }
        ],
        execute: function () {
            NegociacaoController = class NegociacaoController {
                constructor() {
                    this._negocicacoes = new index_js_2.Negociacoes();
                    this._negociacoesView = new index_js_1.NegociacoesView("#negociacoesView");
                    this._mensagemView = new index_js_1.MensagemView("#mensagemView");
                    this._negociacaoService = new index_js_4.NegociacaoService();
                    this._negociacoesView.update(this._negocicacoes);
                }
                adiciona() {
                    let data = new Date(this._inputData.val().toString().replace(/-/g, ","));
                    if (!this._ehDiaUtil(data)) {
                        this._mensagemView.update("Somente negociações em dias úteis, por favor");
                        return;
                    }
                    const negociacao = new index_js_2.Negociacao(data, parseInt(this._inputQuantidade.val().toString()), parseFloat(this._inputValor.val().toString()));
                    this._negocicacoes.adiciona(negociacao);
                    this._negociacoesView.update(this._negocicacoes);
                    this._mensagemView.update("Negociação adicionada com sucesso!");
                }
                _ehDiaUtil(data) {
                    return data.getDay() != DiaDaSemana.Sabado && data.getDay() != DiaDaSemana.Domingo;
                }
                importaDados() {
                    this._negociacaoService
                        .obterNegociacoes(res => {
                        if (res.ok) {
                            return res;
                        }
                        else {
                            throw new Error(res.statusText);
                        }
                    })
                        .then(negociacoes => {
                        negociacoes.forEach(negociacao => this._negocicacoes.adiciona(negociacao));
                        this._negociacoesView.update(this._negocicacoes);
                    });
                }
            };
            __decorate([
                index_js_3.domInject("#data")
            ], NegociacaoController.prototype, "_inputData", void 0);
            __decorate([
                index_js_3.domInject("#quantidade")
            ], NegociacaoController.prototype, "_inputQuantidade", void 0);
            __decorate([
                index_js_3.domInject("#valor")
            ], NegociacaoController.prototype, "_inputValor", void 0);
            __decorate([
                index_js_3.throttle()
            ], NegociacaoController.prototype, "adiciona", null);
            __decorate([
                index_js_3.throttle()
            ], NegociacaoController.prototype, "importaDados", null);
            exports_1("NegociacaoController", NegociacaoController);
            (function (DiaDaSemana) {
                DiaDaSemana[DiaDaSemana["Domingo"] = 0] = "Domingo";
                DiaDaSemana[DiaDaSemana["Segunda"] = 1] = "Segunda";
                DiaDaSemana[DiaDaSemana["Terca"] = 2] = "Terca";
                DiaDaSemana[DiaDaSemana["Quarta"] = 3] = "Quarta";
                DiaDaSemana[DiaDaSemana["Quinta"] = 4] = "Quinta";
                DiaDaSemana[DiaDaSemana["Sexta"] = 5] = "Sexta";
                DiaDaSemana[DiaDaSemana["Sabado"] = 6] = "Sabado";
            })(DiaDaSemana || (DiaDaSemana = {}));
        }
    };
});
