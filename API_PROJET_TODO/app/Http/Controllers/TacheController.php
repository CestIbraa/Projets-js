<?php

namespace App\Http\Controllers;

use App\Http\Requests\TacheRequest;
use App\Models\Tache;
use Illuminate\Http\Request;

class TacheController extends Controller
{
    public function index()
        {
            $taches = Tache::all();
            return response()->json($taches);
        }
    public function store(TacheRequest $request)
        {
            $tache = new Tache;
            $tache->nom = $request->nom;
            if ( $request->statut){
                $tache->statut = $request->statut;
            }else{
                $tache->statut = 0;
            }
            $tache->save();
            return response()->json($tache, 201);
        }
    public function delete($id)
        {
            $tache = Tache::find($id);
            if($tache){
                $tache->delete();
                return response()->json('Tache suppriméé avec succès');
            }else{
                return response()->json('Tache inexistante');
            }

        }

}
