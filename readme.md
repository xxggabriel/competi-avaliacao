# Avaliação Tecnica - Grupo Competi

![](https://raw.githubusercontent.com/xxggabriel/competi-avaliacao/main/public/logocolor.svg)


## Rotas

 - As rotas utilizadas pela API (as rota dela está no diretorio: ./routes/api.php).
 - Já as outras são as rotas das views (que estão no diretorio: ./routes/web.php).

## Validações
![](https://raw.githubusercontent.com/xxggabriel/competi-avaliacao/main/public/img/validacao.gif)
 
 - Duplicidade : A função para verificar se o CNPJ da empresa já foi cadastrada é feita na hora de fazer o "insert" no DB, a função válida se o CNPJ existe no DB, caso exista, retorne um erro, mas deixa inserir caso o CNPJ esteja com o registro excluído.
 - Campos (inputs): estão sendo válidados tanto no front-end quanto no back-end, para proporcionar uma navegação mais fácil possivel para o usuário no front-end e para segurançã no back-end. A validação dos campos no back-end é feita por 3 funções (validar(), regras()), messagens()).
 - Erro 404: A API retorna uma mensagem de erro, caso não encontre a empresa pelo ID passado na URL.

## Listagem Das Empresas

![](https://raw.githubusercontent.com/xxggabriel/competi-avaliacao/main/public/img/listagem-empresas.gif)

A listagem de empresas tem 3 modos de visualização
 - Listar apenas as ativas
 - Listar apenas as inativas
 - Listar todas (tanto ativas e inativas, sem mostrar as empresas excluídas)

## Problemas Enfrentados

Tive um problema que pesquisei e não consegui solucionar que foi um erro com requisições com ajax, quando eu tentava fazer uma requisição direto no navagado com via ajax para a Receita Federal, aparecia um erro de "cross-origin (Motivo: o cabeçalho CORS 'Access-Control-Allow-Origin' não está presente)", pesquisei várias formas para corrigir esse erro, acabei não conseguindo solucionar ele no front-end, então eu fiz a requisição pelo back-end usando o CURL, já com CURL não tive problemas e consegui dar proseguimento a meu projeto.

## Tecnologias Utilizadas

    -Frameworks:
        - Laravel 5.7
        - Jquery 3.5.1
        - Bootstrap 4.5.3
    - PHP 7.2
    - Mysql 8.0

