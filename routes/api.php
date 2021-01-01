<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/consulta/cnpj', 'Api\\ReceitaFederalController@consultaCnpj');
Route::get('/empresa', 'Api\\EmpresaController@listarPorSituacao');
Route::post('/empresa', 'Api\\EmpresaController@criar');
Route::post('/empresa/{id}', 'Api\\EmpresaController@atualizar');
Route::get('/empresa/{id}', 'Api\\EmpresaController@listarEmpresa');
Route::get('/empresa/{id}/delete', 'Api\\EmpresaController@apagar');
