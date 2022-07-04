export const converterData = (data) => {
    if (!data) return "Sem Data";
    // Converte de unix timestamp para data
    let dataFormatada = new Date(data);
    let dia = dataFormatada.getDate();
    let mes = dataFormatada.getMonth() + 1;
    let ano = dataFormatada.getFullYear();
    let hora = dataFormatada.getHours();
    let minuto = dataFormatada.getMinutes();

    hora = hora < 10 ? "0" + hora : hora; // Adiciona zero à esquerda
    minuto = minuto < 10 ? "0" + minuto : minuto; // Adiciona zero à esquerda
    // Formata a data
    return `${dia}/${mes}/${ano} às ${hora}:${minuto}`;
};
