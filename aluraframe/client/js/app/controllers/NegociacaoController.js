
class NegociacaoController {

    constructor() {

        let $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(),
            new NegociacoesView($('#negociacoesView')),
            'adiciona', 'esvazia', 'ordena', 'inverteOrdem'),

        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView($('.mensagem-view')),
            'texto');
        
        this._ordemAtual = '';

    }

    adicionar(event) {

        event.preventDefault();
        this._listaNegociacoes.adiciona(this._criaNegociacao());
        this._mensagem.texto = 'Negociação adicionada com sucesso';
        this._limpaFormulario();
        //console.log(this._listaNegociacoes.negociacoes);

    };

    importaNegociacoes() {

        let service = new NegociaoService();

       Promise.all([
        service.obterNegociacoesDaSemana(),
        service.obterNegociacoesDaSemanaAnterior(),
        service.obterNegociacoesDaSemanaRetrasada()]
        ).then (negociacoes => {
            negociacoes
            .reduce((arrayAchatado, array) => arrayAchatado.concat(array), [])
            .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao)); 
            console.log(negociacoes);
            
            this._mensagem.texto = "Negociações importadas com sucesso ";
       })
       .catch(erro => this._mensagem.texto = erro);
    };


    _criaNegociacao() {

        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        );
    }

    apaga() {

        this._listaNegociacoes.esvazia();
        this._mensagem.texto = 'Negociações apagadas com sucesso';
    };

    ordena(coluna) {
       
        if(this._ordemAtual == coluna) {
            this._listaNegociacoes.inverteOrdem();
        } else {
            this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);
        }
        this._ordemAtual = coluna;
    };  

    _limpaFormulario() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();
    }
    };

