$(function(){
    listarEmpresas()
    
})

$('input[name="situacao"]').click(function(){
    listarEmpresas();
})

function listarEmpresas(url = null){
    
    if(url == null){
        url = "/api/empresa?page=1"
    }
    var situacao = $('input[name="situacao"]:checked').val()
    
    $("tbody").html("")
    $.ajax({
        url : url,
        method : "GET",
        data : {
            situacao : situacao
        }, success : function(empresas){
            paginacao(empresas)
            empresas = empresas.data
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

function paginacao(paginacao){

    var totalPaginas = Math.ceil(paginacao.total / paginacao.per_page)
    
    $("#pagination").html("")
    if(paginacao.prev_page_url){
        adicionarLinkPaginacao('Anterior', paginacao.prev_page_url)
    } else {
        adicionarLinkPaginacao('Anterior', null, true)
    }
    
    
    var checked = false
    for (let index = 1; index <= totalPaginas; index++) {
        if(paginacao.current_page == index){
            checked = true
        }
        console.log(paginacao.current_page, checked, index)
        if(index <= 10){
            adicionarLinkPaginacao(index, paginacao.path+"?page="+totalPaginas, false, checked)
        } else {
            adicionarLinkPaginacao(totalPaginas, paginacao.path+"?page="+totalPaginas)
        }
        checked = false
    }

    if(paginacao.next_page_url){
        adicionarLinkPaginacao('Próximo', paginacao.next_page_url)
    } else {
        adicionarLinkPaginacao('Próximo', null, true)
    }

}

function adicionarLinkPaginacao(nomePagina, url, disabled = false, checked = false){
    var active = ''
    
    if(checked){
        active = 'active'
    }

    if(!disabled){
        $("#pagination").append(`
            <li class="page-item ${active}"><button class="page-link" onclick="listarEmpresas('${url}')">${nomePagina}</button></li>
        `) 
    } else {
        
        $("#pagination").append(`
            <li class="page-item disabled "><button class="page-link" disabled>${nomePagina}</button></li>
        `) 
    }
}