//Busca os dados do servidor e obtém as negociações que serão utilizadas no Controller
//O cb (callback) só será executado caso ocorra o erro

class NegociaoService{

    obterNegociacoesDaSemana(cb) {
        
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'negociacoes/semana');
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    cb(JSON.parse(xhr.responseText)
                    .map( objeto => new Negociacao(new Date (objeto.data), objeto.quantidade, objeto.valor)))
                } else {
                    console.log(xhr.responseText);
                    cb('Não foi possível obter as negociações da semana')
                }
            }
        }
        xhr.send();
    }
}