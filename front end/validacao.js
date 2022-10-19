$(function() {
    $('#m-cep').mask('00000-000');
    $('#m-cpf').mask('000.000.000-00', {reverse: true});
    $('#m-cnpj').mask('00.000.000/0000-00', {reverse: true});
})