var behavior = function (val) {
    return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
},
options = {
    onKeyPress: function (val, e, field, options) {
        field.mask(behavior.apply({}, arguments), options);
    }
};
$('#telefone').mask(behavior, options);
$("#cep").mask("00000-000")
$("#cnae").mask("0000-0-00")
$("#cnpj").mask("00.000.000/0000-00")

$("#cnpj").blur(function(){
    var cnpj = $(this).val();
    if(!validarCNPJ(cnpj)){
        $(this).addClass("is-invalid")
        $("#cnpj_msg").addClass("invalid-feedback").html('CNPJ inválido')
        limparCampos()
    } else {
        $(this).removeClass("is-invalid")
        $("#cnpj_msg").removeClass("invalid-feedback").html('')

        var empresa = consultarCNPJReceitaFederal(cnpj.replace(/[^\d]+/g,''));
    }
})

$("#observacao_chebox").click(function(){
    console.log($(this).is(':checked'))
    if($(this).is(':checked')){
        $("#grupo-observacao").show()
    } else {
        $("#grupo-observacao").hide()
    }
})

function consultarCNPJReceitaFederal(cnpj){
    
    preencherCamposComBolinhas()

    $.ajax({
        url : "/api/consulta/cnpj",
        method : "GET",
        data : {
            cnpj : cnpj
        },
        success : function(empresa){
            console.log(empresa)


            if(empresa.status == "ERROR"){
                $("#cnpj").addClass("is-invalid")
                $("#cnpj-msg").addClass("invalid-feedback").html("Dados não encontrados")
                limparCampos()

            } else {
                preencherCampos(empresa)
            }
        }
    })
}

function limparCampos(){
    
    $("#razao_social").val("");
    $("#telefone").val("");
    $("#nome_fantasia").val("");
    $("#cnae").val("");
    $("#cep").val("");
    $("#bairro").val("");
    $("#logradouro").val("");
    $("#cidade").val("");
    $("#estado").val("");
}

function preencherCamposComBolinhas(){
    $("#razao_social").val("...");
    $("#telefone").val("...");
    $("#nome_fantasia").val("...");
    $("#cnae").val("...");
    $("#cep").val("...");
    $("#bairro").val("...");
    $("#logradouro").val("...");
    $("#cidade").val("...");
    $("#estado").val("...");
}

function preencherCampos(empresa){
    $("#razao_social").val(empresa.nome)
    $("#telefone").val(empresa.telefone)
    $("#nome_fantasia").val(empresa.fantasia)
    $("#cnae").val(empresa.atividade_principal[0].code)
    $("#cep").val(empresa.cep)
    $("#bairro").val(empresa.bairro)
    $("#logradouro").val(empresa.logradouro)
    $("#cidade").val(empresa.municipio)
    $("#estado").val(empresa.uf)
    if(empresa.situacao == "ATIVA") {
        $("#situacao_ativa").attr("checked", "checked")
        $("#situacao_inativa").removeAttr("checked");
    } else {
        $("#situacao_ativa").removeAttr("checked");
        $("#situacao_inativa").attr("checked", "checked");
    }
}

function validarCNPJ(cnpj) {
 
    cnpj = cnpj.replace(/[^\d]+/g,'');
 
    if(cnpj == '') return false;
     
    if (cnpj.length != 14)
        return false;
 
    if (cnpj == "00000000000000" || 
        cnpj == "11111111111111" || 
        cnpj == "22222222222222" || 
        cnpj == "33333333333333" || 
        cnpj == "44444444444444" || 
        cnpj == "55555555555555" || 
        cnpj == "66666666666666" || 
        cnpj == "77777777777777" || 
        cnpj == "88888888888888" || 
        cnpj == "99999999999999")
        return false;
         
    
    tamanho = cnpj.length - 2
    numeros = cnpj.substring(0,tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return false;
         
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0,tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
          return false;
           
    return true;
    
}

function preencheCampos(id = null){
    if(id){
        $.ajax({
            url : "/api/empresa/"+id,
            method : "GET",
            success : function(empresa){
                $("#cnpj").val(empresa.cnpj);
                $("#razao_social").val(empresa.razao_social);
                $("#nome_fantasia").val(empresa.nome_fantasia);
                $("#cnae").val(empresa.cnae);
                $("#telefone").val(empresa.telefone);
                $("#logradouro").val(empresa.logradouro);
                $("#cep").val(empresa.cep);
                $("#bairro").val(empresa.bairro);
                $("#cidade").val(empresa.cidade);
                $("#estado").val(empresa.estado);
                $("#observacao").val(empresa.observacao);
                if(empresa.situacao == "ativada"){
                    $("#situacao_ativa").attr("checked", "checked");
                    $("#situacao_inativa").removeAttr("checked");
                } else if (empresa.situacao == "inativa") {
                    $("#situacao_ativa").removeAttr("checked");
                    $("#situacao_inativa").attr("checked", "checked");
                }
            }
        })
    }
}

$('form').submit(function(e){
    e.preventDefault();
})

function validarCampos(){
    var erro = true
    if($("#razao_social").val().length > 255){
        $("#razao_social").addClass("is-invalid")
        $("#razao_social_msg").addClass("invalid-feedback").html("O campo razão social deve ter no máximo 255 caracteres.")
        erro = false
    }

    if($("#telefone").val().length < 10){
        $("#telefone").addClass("is-invalid")
        $("#telefone_msg").addClass("invalid-feedback").html("O campo telefone deve ter no mínimo 10 caracteres.")
        erro = false
    }

    if($("#nome_fantasia").val().length > 255){
        $("#nome_fantasia").addClass("is-invalid")
        $("#nome_fantasia_msg").addClass("invalid-feedback").html("O campo nome fantazia deve ter no mínimo 255 caracteres.")
        erro = false
    }

    if($("#cnae").val().length < 7 && $("#cnae").val().length > 10){
        $("#cnae").addClass("is-invalid")
        $("#cnae_msg").addClass("invalid-feedback").html("O campo cnae deve ter no mínimo 7 e no máximo 10 caracteres.")
        erro = false
    }

    if($("#cep").val().length < 8 && $("#cep").val().length > 10){
        $("#cep").addClass("is-invalid")
        $("#cep_msg").addClass("invalid-feedback").html("O campo cep deve ter no mínimo 8 e no máximo 10 caracteres.")
        erro = false
    }

    if($("#bairro").val().length > 255){
        $("#bairro").addClass("is-invalid")
        $("#bairro_msg").addClass("invalid-feedback").html("O campo bairro deve ter no máximo 255 caracteres.")
        erro = false
    }

    if($("#logradouro").val().length > 255){
        $("#bairro").addClass("is-invalid")
        $("#bairro_msg").addClass("invalid-feedback").html("O campo bairro deve ter no máximo 255 caracteres.")
        erro = false
    }

    if($("#cidade").val().length > 255){
        $("#cidade").addClass("is-invalid")
        $("#cidade_msg").addClass("invalid-feedback").html("O campo bairro deve ter no máximo 255 caracteres.")
        erro = false
    }

    if($("#estado").val().length != 2){
        $("#estado").addClass("is-invalid")
        $("#estado_msg").addClass("invalid-feedback").html("Estado inválido.")
        erro = false
    }

    if($("#observacao").val().length > 255){
        $("#observacao").addClass("is-invalid")
        $("#observacao_msg").addClass("invalid-feedback").html("O campo observacao deve ter no máximo 255 caracteres.")
        erro = false
    }

    return erro
}

function scrollTopo(){
    targetOffset = $("body").offset().top;
    $('html, body').animate({
        scrollTop:targetOffset
    },1000)
}

function salvarEmpresa(id = null){
    if(validarCampos()){
        $("#btn-salvar").attr("disabled", "disabled")
        $("#info").removeClass("alert").removeClass("alert-info").html("")

        var url = "/api/empresa/";
    
        if(id){
            url = "/api/empresa/"+id
        }
    
        $.ajax({
            url : url,
            method : "POST",
            data : {
                cnpj            : $("#cnpj").val(),
                razao_social    : $("#razao_social").val(),
                nome_fantasia   : $("#nome_fantasia").val(),
                cnae            : $("#cnae").val(),
                telefone        : $("#telefone").val(),
                logradouro      : $("#logradouro").val(),
                cep             : $("#cep").val(),
                bairro          : $("#bairro").val(),
                cidade          : $("#cidade").val(),
                estado          : $("#estado").val(),
                observacao      : $("#observacao").val(),
                situacao        : $('input[name="situacao"]:checked').val(),
            }, success : function(res){
                if(res.erro){
                    if(res.mensagens){
                        Object.keys(res.mensagens).forEach(function(key) {
                            $("#"+key).addClass("is-invalid")
                            $("#"+key+"_msg").addClass("invalid-feedback").html(res.mensagens[key][0])
                            
                            $("#"+key).blur(function(){
                                $("#"+key).removeClass("is-invalid")
                                $("#"+key+"_msg").removeClass("invalid-feedback").html("")
                            })
        
                            scrollTopo()
                        });
                    } else {
                        $("#info").addClass("alert").addClass("alert-info").html(res.messagem)
                        scrollTopo()
                    }

                    $("#btn-salvar").removeAttr("disabled")
                } else {
                    window.location.href = "/";
                }
    
            }
        })
    } else {
        scrollTopo()
    }
}

function retornarInicio(){
    if(confirm("Você realmente deseja sair desta página?")){
        window.location.href = "/"
    }
}