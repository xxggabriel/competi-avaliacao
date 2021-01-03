@extends('layouts.master')
@section('title', '- Listagem de empresas')

@section('main')
    <div class="container">
        <section>
          <div class="opcoes">
            <div class="row">
                <a href="/empresa/cadastro">
                  <button class="btn btn-success">Cadastrar Empresa</button>
                </a>
                    <div class="form-check distancia-input">
                        <input type="radio" class="form-check-input" id="situacao-ativa" checked name="situacao" value="ativa">
                        <label for="">Ativa</label>
                    </div>
  
                    <div class="form-check">
                        <input type="radio" class="form-check-input" id="situacao-inativa" name="situacao" value="inativa">
                        <label for="">Inativa</label>
                    </div>
  
                    <div class="form-check distancia-input">
                      <input type="radio" class="form-check-input" id="situacao-ativa" name="situacao" value="todas">
                      <label for="">Todas</label>
                  </div>
              </div>
              
          </div>
        </section>
        <section>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">CNPJ</th>
                <th scope="col">Razão Social</th>
                <th scope="col">Nome Fantasia</th>
                <th scope="col">CNAE</th>
                <th scope="col">Telefone</th>
                <th scope="col">Ação</th>
              </tr>
            </thead>
            <tbody>
              
            </tbody>
          </table>
          
          <nav>
            <ul class="pagination justify-content-center" id="pagination">
            </ul>
          </nav>
        </section>
    </div>
@endsection

@section('scripts')
    <script src="js/index.js"></script>
@endsection
