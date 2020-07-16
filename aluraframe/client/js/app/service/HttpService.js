
class HttpService {

    get(url) {

        return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'negociacoes/semana');
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {

                    resolve(JSON.parse(xhr.responseText)
                    .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));

                } else {
                    reject('Não foi possível obter as negociações da semana');
                }
            }
        }
        
        xhr.send();
        
        });
    }

    post(url, dado) {


    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.onreadystatechange = () => {

            if (xhr.readyState == 4) {

                if (xhr.status == 200) {

                    resolve(JSON.parse(xhr.responseText));
                } else {

                    reject(xhr.responseText);
                }
            }
        };
        xhr.send(JSON.stringify(dado));
    });

    }
}