<?php

namespace App\Http\Controllers\Site;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Empresa;
class EmpresaController extends Controller
{

    public function index()
    {
        return view("site.index");
    }

    public function criar()
    {
        $id = null;
        return view("site.formulario", compact("id"));
    }


    public function editar($id)
    {
        $empresa = Empresa::where("id", $id);
            
        if(!$empresa->exists()){
            return redirect()->route("home");
        }
        return view("site.formulario", compact("id"));
    }

}
