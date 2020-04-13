
class DateHelper {

    constructor (){
        throw new Error('Sai fora! não pode instanciar a DateHelper aqui não!!');
    }

    static dataParaTexto(data) {        
        return `${data.getDate()}/${(data.getMonth() + 1)}/${data.getFullYear()}`;
    }
    
    static textoParaData(texto) {
        if(!/^\d{4}-\d{2}-\d{2}$/.test(texto)) throw new Error('Heyyy, deve estar no formato aaaa-mm-dd');
        return new Date(...
            texto.split('-')
                .map((item, indice) => item - indice % 2)
        );

    }

}