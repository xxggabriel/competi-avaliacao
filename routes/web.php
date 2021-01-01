<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', 'Site\\EmpresaController@index')->name("home");
Route::get('/empresa/cadastro', 'Site\\EmpresaController@criar')->name("criar");
Route::get('/empresa/editar/{id}', 'Site\\EmpresaController@editar')->name("editar");
