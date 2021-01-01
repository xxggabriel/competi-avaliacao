@extends('layouts.master')
@section('title', '- Cadastro')

@section('main')
    <div class="container">
        <form id="cadastro">
            <div id="info"></div>
            <div class="area">
                <div class="area-titulo">
                    CNPJ
                </div>

                <div class="area-conteudo">
                    <div class="form-group">
                        <label for="">CNPJ:</label>
                        <input type="text" class="form-control" id="cnpj" required>
                        <div id="cnpj_msg"></div>
                       
                    </div>

                    <div class="form-group">
                        <label for="">Razão Social:</label>
                        <input type="text" class="form-control" id="razao_social">
                        <div id="razao_social_msg"></div>
                    </div>
                    
                    <div class="form-group">
                        <label for="">Nome Fantasia:</label>
                        <input type="text" class="form-control" id="nome_fantasia">
                        <div id="nome_fantasia_msg"></div>
                    </div>

                    <div class="form-group">
                        <label for="">Telefone:</label>
                        <input type="text" class="form-control" id="telefone">
                        <div id="telefone_msg"></div>
                    </div>

                    <div class="form-group">
                        <label for="">CNAE:</label>
                        <input type="text" class="form-control" id="cnae">
                        <div id="cnae_msg"></div>
                    </div>
                </div>
            </div>

            <div class="area">
                <div class="area-titulo">
                    Endereço
                </div>
                <div class="area-conteudo">
                    <div class="form-group">
                        <label for="">logradouro:</label>
                        <input type="text" class="form-control" id="logradouro">
                        <div id="logradouro_msg"></div>
                    </div>

                    <div class="form-group">
                        <label for="">bairro:</label>
                        <input type="text" class="form-control" id="bairro">
                        <div id="bairro_msg"></div>
                    </div>

                    <div class="form-group">
                        <label for="">CEP:</label>
                        <input type="text" class="form-control" id="cep">
                        <div id="cep_msg"></div>
                    </div>

                    <div class="form-group">
                        <label for="">cidade:</label>
                        <input type="text" class="form-control" id="cidade">
                        <div id="cidade_msg"></div>
                    </div>

                    <div class="form-group">
                        <label for="">estado:</label>
                        <input type="text" class="form-control" id="estado">
                        <div id="estado_msg"></div>
                    </div>
                </div>

            </div>

            <div class="area">
                <div class="area-titulo">
                    Observação
                </div>
                <div class="area-conteudo">
                    <div class="form-check">
                        <input type="checkbox" class="form-check-input" id="observacao_chebox" value="1" checked>
                        <label for="">Usa observação</label>
                        
                    </div>

                    <div class="form-group" id="grupo-observacao">
                        <label for="">observação:</label>
                        <input type="text" class="form-control" id="observacao">
                        <div id="observacao_msg"></div>
                    </div>
                </div>
            </div>

            <div class="area">
                <div class="area-titulo">
                    Situação Da Empresa 
                </div>
                <div class="area-conteudo">
                    <div class="row">
                        <div class="form-check distancia-input">
                            <input type="radio" class="form-check-input" id="situacao_ativa" checked name="situacao" value="ativa">
                            <label for="">Ativa</label>
                        </div>
    
                        <div class="form-check">
                            <input type="radio" class="form-check-input" id="situacao_inativa" name="situacao" value="inativa">
                            <label for="">Inativa</label>
                        </div>
                    </div>
                </div>
            </div>

            <button class="btn btn-danger" onclick="retornarInicio()">Voltar</button>
            <button class="btn btn-success" id="btn-salvar" onclick="salvarEmpresa({{$id}})">Cadastrar</button>
        </form>
    </div>
        
@endsection

@section('scripts')
<script src="/js/script.js"></script>
    
    <script>
        preencheCampos({{$id}});
    </script>
    
@endsection
