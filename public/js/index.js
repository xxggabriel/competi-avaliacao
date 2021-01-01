$(function(){
    ListarEmpresas()
})

$('input[name="situacao"]').click(function(){
    ListarEmpresas();
})

function ListarEmpresas(){

    var situacao = $('input[name="situacao"]:checked').val()
    
    $("tbody").html("")
    $.ajax({
        url : "api/empresa",
        method : "GET",
        data : {
            situacao : situacao
        }, success : function(empresas){
            
            var backgroundTr 
            empresas.forEach(empresa => {
                if(empresa.situacao == "inativa"){
                    backgroundTr = 'style="background-color: #e673aa;"'
                    console.log("AQUI")
                } else {
                    backgroundTr = 'style="background-color: #a3cfe0;"'
                }

                Object.keys(empresa).forEach(key => {
                
                    if(empresa[key] == null){
                        empresa[key] = "####"
                    }
                });

                
                $("tbody").append(`
                    <tr ${backgroundTr}>
                        <th scope="row" class="cnpj">${empresa.cnpj}</th>
                        <td class="razao_social">${empresa.razao_social}</td>
                        <td class="nome_fantasia">${empresa.nome_fantasia}</td>
                        <td class="cnae">${empresa.cnae}</td>
                        <td class="telefone">${empresa.telefone}</td>
                        <td>
                            <a href="/empresa/editar/${empresa.id}">
                                <button class="btn btn-success">Editar</button>
                            </a>
                            <button class="btn btn-danger" onclick="deletarEmpresa('${empresa.id}')">X</button>
                        </td>
                    </tr>
                `)

                backgroundTr = ""
            });
        }
    })
}

function deletarEmpresa(id){
    $.ajax({
        url : "api/empresa/"+id+"/delete",
        method : "GET",
        success : function(){
            ListarEmpresas();
        }
    })
}