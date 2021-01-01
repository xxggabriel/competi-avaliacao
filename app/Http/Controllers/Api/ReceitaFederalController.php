<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ReceitaFederalController extends Controller
{
    public function consultaCnpj(Request $req)
    {
        $cnpj = $req->input("cnpj");
        $dadosEmpresa = json_decode($this->getEmpresaReceitaFedera($cnpj));
        return response()->json($dadosEmpresa);
    }

    private function getEmpresaReceitaFedera($cnpj){
        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => 'https://www.receitaws.com.br/v1/cnpj/'.$cnpj,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'GET',
        ));

        $response = curl_exec($curl);

        curl_close($curl);
        return $response;
    }
}
