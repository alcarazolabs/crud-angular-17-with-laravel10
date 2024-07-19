<?php

namespace App\Http\Controllers;

use App\Models\People;
use Illuminate\Http\Request;
use App\Http\Requests\createPersonRequests;

class PersonController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $totalPerPage = 5;
        
        $people = People::orderBy('id','desc')->paginate($totalPerPage)->withQueryString();
        return $people;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(createPersonRequests $request){
        /*
        * Headers:
            "Content-Type": "application/json"
            "Accept": "application/json"
        */

        if($request->validated()){
            try{
                //intervenir en alguna campo del request, esto es otro caso..
                //$request["password"] =  Hash::make($request->password);
            
              $person =  People::create($request->all());
            
              return $person;

              }catch(\Exception $e){
            
                return response()->json(['success' => false,
                                         'error' => $e->getMessage()]);

            }
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $person = People::findOrFail($id);

        return $person;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $person = People::findOrFail($request->id);
        $person->update([
            'fullname' => $request->fullname,
            'dni' => $request->dni,
            'genero' => $request->genero,
            'city' => $request->city,
            'acceptTerms' => $request->acceptTerms
        ]);

        return $person;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id) {
    
        try{

            $person = People::findOrFail($id);

            $person->delete();
            
            return response()->json(['success' => true]);
        
            }catch(\Exception $e){
            
                return response()->json(['success' => false,
                                         'error' => $e->getMessage()]);

            }
    }
}
