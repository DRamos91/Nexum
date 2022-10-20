const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sEmail = document.querySelector('#m-email')
const sTipoPessoa = document.querySelector('#m-tipo')
const sCpf = document.querySelector('#m-cpf')
const sCnpj = document.querySelector('#m-cnpj')
const sCep = document.querySelector('#m-cep')
const sEndereco = document.querySelector('#m-endereco')
// const sLogradouro = document.querySelector('#m-logradouro')
const sBairro = document.querySelector('#m-bairro')
const sCidade = document.querySelector('#m-cidade')
const sEstado = document.querySelector('#m-estado')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

$(document).ready(function () {
  listarItens();
});

$('#m-tipo').change(function () {
  if ($(this).val() == 'fisica') {
    $(".box-cpf").show();
    $(".box-cnpj").hide();
  } else if ($(this).val() == 'juridica') {
    $(".box-cnpj").show();
    $(".box-cpf").hide();
  } else {
    $(".box-cnpj").hide();
    $(".box-cpf").hide();
  }
});

function listarItens() {
  $.ajax({
    url: 'http://localhost:8080/cliente',
    type: 'get',
    dataType: 'JSON',
    success: function (data) {

      var len = data.length;
      for (var i = 0; i < len; i++) {
        var id = data[i].id;
        var nome = data[i].nome;
        var email = data[i].email;
        var tipo_pessoa = data[i].tipoPessoa;
        var cpf = data[i].cpf;
        var cnpj = data[i].cnpj;
        var cep = data[i].cep;
        var endereco = data[i].endereco;
        // var logradouro = data[i].logradouro;
        var bairro = data[i].bairro;
        var cidade = data[i].cidade;
        var estado = data[i].estado;
        console.log(data)
        if (typeof cpf !== 'undefined' && cpf) {
          var cpf_cnpj = cpf;
        } else if (typeof cnpj !== 'undefined' && cnpj) {
          var cpf_cnpj = cnpj;
        } else {
          var cpf_cnpj = ""
        }

        var tr_str = "<tr>" +
          "<td>" + id + "</td>" +
          "<td width='10%' align='left'>" + nome + "</td>" +
          "<td width='10%' align='left' class='sem-quebra'>" + email + "</td>" +
          "<td width='10%' align='center'>" + tipo_pessoa + "</td>" +
          "<td align='left'>" + cpf_cnpj + "</td>" +
          "<td align='left'>" + cep + "</td>" +
          // "<td align='left'>" + logradouro + "</td>" +
          "<td align='left'>" + endereco + "</td>" +
          "<td align='left'>" + bairro + "</td>" +
          "<td align='left'>" + cidade + "</td>" +
          "<td align='left'>" + estado + "</td>" +
          "<td align='center'><button class='btn btn-primary' onclick='openModal(true, " + id + ")'><i class='fa fa-edit'></i></button></td>" +
          "<td align='center'><button class='btn btn-danger' onclick='excluir(" + id + ")'><i class='fa fa-trash'></i></button></td></td>" +
          "</tr>";

        $("#contentItems").append(tr_str);
      }
    }
  });
}

function openModal(edit, index) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    $.getJSON('http://localhost:8080/cliente', function (data) {
      if (data != undefined && data.length > 0) {

        for (i = 0; i < data.length; i++) {
          if (i == index) {

            sNome.value = data[i].nome;
            sEmail.value = data[i].email;
            //Preciso mudar a option selecionada e ativar o evento change através do trigger para validar a exibição de CPF ou CNPJ
            $('#m-tipo option[value="' + data[i].tipoPessoa + '"]').prop('selected', true);
            $('#m-tipo').trigger('change');

            sCnpj.value = data[i].cnpj;
            sCpf.value = data[i].cpf;
            sCep.value = data[i].cep;
            sEndereco.value = data[i].endereco;
            sBairro.value = data[i].bairro;
            sCidade.value = data[i].cidade;
            sEstado.value = data[i].estado;
          }
        }
      }
    });
    $("#btnSalvar").val('editar');
    $("#id-cliente").val(index);
  } else {
    limparDados();
  }

}

function alterarDados(id){
  var id = id;
  var nome = $('#m-nome').val();
  var email = $('#m-email').val();
  var tipoPessoa = $('#m-tipo option').filter(':selected').val();
  var cnpj = $('#m-cnpj').val();
  var cpf = $('#m-cpf').val();
  var cep = $('#m-cep').val();
  var endereco = $('#m-endereco').val();
  // var logradouro = $('#m-logradouro').val();
  var bairro = $('#m-bairro').val();
  var cidade = $('#m-cidade').val();
  var uf = $('#m-estado').val();

  var object = {
    id: id,
    nome: nome,
    email: email,
    tipoPessoa: tipoPessoa,
    cpf: cpf,
    cnpj: cnpj,
    cep: cep,
    endereco: endereco,
    bairro: bairro,
    cidade: cidade,
    estado: uf
  }

  var params = JSON.stringify(object);

  $.ajax({
    url: 'http://localhost:8080/cliente/editar/'+id,
    contentType: 'application/json',
    cache: false,
    type: 'PUT',
    data: params,
    beforeSend: function () {
    },
    success: function (data) {
      modal.classList.remove('active');
      console.log("dados alterados com sucesso");
      $("#btnSalvar").val('');
    },
    error: function (xhr) { // if error occured
      alert("Ocorreu um erro!");
      console.log(xhr.statusText + xhr.responseText);
    },
    complete: function () {
      limparDados();
    }
  });
}

function excluir(index){
  const id = index;
  const lista = [];

  $.getJSON('http://localhost:8080/cliente', function (data) {
    if (data != undefined && data.length > 0) {
      lista = data;
    }
  });

  const indexToRemove = lista.findIndex((pl) => pl.id === id);
  lista.splice(indexToRemove, 1);

  $.ajax({
    url: 'http://localhost:8080/cliente/excluir/'+id,
    contentType: 'application/json',
    cache: false,
    type: 'DELETE',
    data: lista,
    beforeSend: function () {
    },
    success: function (data) {
      alert("item removido com sucesso!");
      console.log("sucesso");
    },
    error: function (xhr) { // if error occured
      alert("Ocorreu um erro!");
      console.log(xhr.statusText + xhr.responseText);
    },
    complete: function () {
      listarItens();
    }
  });
}

btnSalvar.onclick = e => {

  e.preventDefault();

  var btnEdit = $("#btnSalvar").val();
  var idCliente = $("#id-cliente").val();

  if(btnEdit == 'editar'){
    alterarDados(idCliente);
  } else{
    var nome = $('#m-nome').val();
    var email = $('#m-email').val();
    var tipoPessoa = $('#m-tipo option').filter(':selected').val();
    var cnpj = $('#m-cnpj').val();
    var cpf = $('#m-cpf').val();
    var cep = $('#m-cep').val();
    var endereco = $('#m-endereco').val();
    // var logradouro = $('#m-logradouro').val();
    var bairro = $('#m-bairro').val();
    var cidade = $('#m-cidade').val();
    var uf = $('#m-estado').val();

    var object = {
      nome: nome,
      email: email,
      tipoPessoa: tipoPessoa,
      cpf: cpf,
      cnpj: cnpj,
      cep: cep,
      endereco: endereco,
      bairro: bairro,
      cidade: cidade,
      estado: uf
    }

    var params = JSON.stringify(object);

    $.ajax({
      url: 'http://localhost:8080/cliente/criar',
      contentType: 'application/json',
      cache: false,
      method: 'POST',
      dataType: 'json',
      data: params,
      beforeSend: function () {
      },
      success: function (data) {
        modal.classList.remove('active');
        console.log("sucesso");
      },
      error: function (xhr) { // if error occured
        alert("Ocorreu um erro!");
        console.log(xhr.statusText + xhr.responseText);
      },
      complete: function () {
        limparDados();
        listarItens();
      }
    });
  }
}

function limparDados(){
  sNome.value = '';
  sEmail.value = '';

  //Preciso mudar a option selecionada e ativar o evento change através do trigger para validar a exibição de CPF ou CNPJ
  $('#m-tipo option[value=""]').prop('selected', true);
  $('#m-tipo').trigger('change');

  sCnpj.value = '';
  sCpf.value = '';
  sCep.value = '';
  sEndereco.value = '';
  sBairro.value = '';
  sCidade.value = '';
  sEstado.value = '';
}