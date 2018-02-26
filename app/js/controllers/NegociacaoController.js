class NegociacaoController {
    constructor() {
        this._negocicacoes = new Negociacoes();
        this._negociacoesView = new NegociacoesView("#negociacoesView");
        this._mensagemView = new MensagemView("#mensagemView");
        this._inputData = $("#data");
        this._inputQuantidade = $("#quantidade");
        this._inputValor = $("#valor");
        this._negociacoesView.update(this._negocicacoes);
    }
    adiciona(event) {
        event.preventDefault();
        const negociacao = new Negociacao(new Date(this._inputData.val().toString().replace(/-/g, ",")), parseInt(this._inputQuantidade.val().toString()), parseFloat(this._inputValor.val().toString()));
        this._negocicacoes.adiciona(negociacao);
        this._negociacoesView.update(this._negocicacoes);
        this._mensagemView.update("Negociação adicionada com sucesso!");
    }
}
