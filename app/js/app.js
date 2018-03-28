System.register(["./controllers/NegociacaoController.js"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var NegociacaoController_js_1, controller;
    return {
        setters: [
            function (NegociacaoController_js_1_1) {
                NegociacaoController_js_1 = NegociacaoController_js_1_1;
            }
        ],
        execute: function () {
            controller = new NegociacaoController_js_1.NegociacaoController();
            $(".form").submit(controller.adiciona.bind(controller));
            $("#botao-importa").click(controller.importaDados.bind(controller));
        }
    };
});
