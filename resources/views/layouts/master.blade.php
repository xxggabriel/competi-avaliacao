<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="/css/bootstrap.min.css">
    <link rel="stylesheet" href="/css/style.css">

    @yield('head')
    <title>Competi Avaliação @yield('title')</title>
</head>
    <body>
        <header>
            <div class="container">
                <div class="logo">
                    <a href="/">
                        <img src="/svg/logocolor.svg" alt="">
                    </a>
                </div>
            </div>
        </header>
        <main>
            @yield('main')
        </main>
        
        <script src="/js/jquery.min.js"></script>
        <script src="/js/jquery.mask.min.js"></script>
        @yield('scripts')
    </body>
</html>