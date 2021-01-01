<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Empresa;
use Illuminate\Support\Facades\Validator;

class EmpresaController extends Controller
{


    public function listarPorSituacao(Request $req, $id = null)
    {
        $situacaoEmpresa = $req->input("situacao");
        if($situacaoEmpresa == "ativa" || $situacaoEmpresa == "inativa"){
            $empresa = Empresa::where("situacao", $situacaoEmpresa)
                            ->where("status", 1)
                            ->orderBy('updated_at','DESC')->get();
        } else {
            $empresa = Empresa::where("status", 1)
                            ->orderBy('updated_at','DESC')
                            ->get();

        }

        return response()->json($empresa);
        
    }

    public function listarEmpresa($id)
    {
        $empresa = Empresa::where("status", 1)
                            ->where("id", $id)
                            ->orderBy('updated_at','DESC');
        if(!$empresa->exists()){
            return response()->json([
                "erro" => true,
                "messagem" => "Empresa não encontrada"
            ]);
        }

        return response()->json($empresa->first());            
    }

    public function validar($req)
    {

        $validator = Validator::make($req->all(), $this->regras(), $this->messagens());

        if ($validator->fails()) {            
            return [
                "erro" => true,
                "mensagens" => $validator->messages()
            ];
       }

       return [
            "erro" => false,
            "mensagens" => null
        ];
    }

    private function regras()
    {
        return [
            'cnpj'          => 'required|cnpj',
            'razao_social'  => 'nullable|max:255',
            'nome_fantasia' => 'nullable|max:255',
            'cnae'          => 'nullable|max:10|min:7',
            'telefone'      => 'nullable|min:10',
            'logradouro'    => 'nullable|max:255',
            'bairro'        => 'nullable|max:255',
            'cep'           => 'nullable|min:8|max:10',
            'cidade'        => 'nullable|max:255',
            'estado'        => 'nullable|max:2|min:2',
            'observacao'    => 'nullable|max:255',
            'situacao'      => 'nullable|max:8',
        ];
    }

    private function messagens()
    {
        return [
            "max" => "O campo :attribute deve ter no máximo :max caracteres.",
            "min" => "O campo :attribute deve ter no mínimo :min caracteres.",
            "required" => "O campo :attribute deve ser preenchido.",
        ];
    }

    public function salvarDB($req, $id = null)
    {
        $cnpj           = $req->input("cnpj");
        $razao_social   = $req->input("razao_social");
        $nome_fantasia  = $req->input("nome_fantasia");
        $cnae           = $req->input("cnae");
        $telefone       = $req->input("telefone");
        $logradouro     = $req->input("logradouro");
        $cep            = $req->input("cep");
        $bairro         = $req->input("bairro");
        $cidade         = $req->input("cidade");
        $estado         = $req->input("estado");
        $observacao     = $req->input("observacao");
        $situacao       = $req->input("situacao");
        $status         = 1;

        if($id){
            $empresa = Empresa::where("id", $id);
            
            if(!$empresa->exists()){
                return response()->json([
                    "erro" => true,
                    "messagem" => "Empresa não encontrada"
                ]);
            }

            $empresa = $empresa->first();
        }else {
            $empresa = Empresa::where("cnpj", $cnpj)->where("status", 1);
            
            if($empresa->exists()){
                return response()->json([
                    "erro" => true,
                    "messagem" => "Empresa já cadastrada."
                ]);
                    
            }

            $empresa = $empresa = new Empresa();;
        }

        $empresa->cnpj          = $cnpj;
        $empresa->telefone      = $telefone;
        $empresa->cep           = $cep;
        $empresa->razao_social  = $razao_social;
        $empresa->nome_fantasia = $nome_fantasia;
        $empresa->cnae          = $cnae;
        $empresa->logradouro    = $logradouro;
        $empresa->bairro        = $bairro;
        $empresa->cidade        = $cidade;
        $empresa->estado        = $estado;
        $empresa->observacao    = $observacao;
        $empresa->situacao      = $situacao;
        $empresa->status        = $status;
        $salvo = $empresa->save();

        return response()->json([
            "erro" => !$salvo,
            "messagem" => null
        ]);
    }

    public function criar(Request $req)
    {   
        $validacao = $this->validar($req);
        
        if($validacao["erro"]){
            return $validacao;
        }
        
        return $this->salvarDB($req);
    }

    public function atualizar(Request $req, $id)
    {
        $validacao = $this->validar($req);
        
        if($validacao["erro"]){
            return $validacao;
        }

        return $this->salvarDB($req, $id);

    }

    public function apagar(Request $req, $id)
    {
        $empresa = Empresa::where("id", $id);
            
        if(!$empresa->exists()){
            return response()->json([
                "erro" => true,
                "messagem" => "Empresa não encontrada"
            ]);
        }

        $empresa = $empresa->first();
        $empresa->status = 0;
        $empresa->save();

        return response()->json([
            "erro" => false,
            "messagem" => null
        ]);
    }
}
