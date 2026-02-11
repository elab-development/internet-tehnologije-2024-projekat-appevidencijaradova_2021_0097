<?php

namespace App\Http\Controllers;

use App\Http\Resources\DocumentCollection;
use App\Http\Resources\DocumentResource;
use App\Models\Document;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class DocumentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $documents=Document::all();
        return new DocumentCollection($documents);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $document = Document::create([
            'filename' => $request->filename,
        ]);

        return response()->json($document, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Document $document)
    {
        if(is_null($document)){
            return response()->json('Data not found', 404);
        }
        return new DocumentResource($document);
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Document $document)
    {
        if(is_null($document)){
            return response()->json('Data not found', 404);
        }
        $document->update([
            'filename' => $request->filename,
        ]);

        return response()->json($document);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Document $document)
    {
        if(is_null($document)){
            return response()->json('Data not found', 404);
        }
        $document->reportovi()->delete();
        $document->delete();

        return response()->json(['message' => 'Document deleted successfully']);

    }


    public function uploadFile(Request $request){

        $file = $request->file('file');
        $filename = time() . '_' . $file->getClientOriginalName();
        $file->storeAs('uploads', $filename, 'public');

        $user = Auth::user();

        if ($user) {
            Document::create([
                'filename' => $filename,
                'user_id' => $user->id,
            ]);
        }
        else{
            return response()->json(['failed'=>'User doesnt exist.']);
        }
        return response()->json(['success' => 'Fajl is successfuly updated.']);
    }

    public static function file_u_tekst($id){
        $document=Document::find($id);
        if(is_null($document)){
            return response()->json('Data not found', 404);
        }
        $filePath = storage_path("app/public/uploads/{$document->filename}");

        if (!file_exists($filePath)) {
            return response()->json('Data not found', 404);
        }

        $fileExtension = pathinfo($document->filename, PATHINFO_EXTENSION);

        if ($fileExtension !== 'txt') {
            return response()->json(['error' => 'Only TXT files are supported'], 400);
        }

        $sadrzaj = file_get_contents($filePath);

        $reci=preg_split('/\s+/',trim($sadrzaj));

        $delovi=[];
        $velicinaDelova = 4900;
        $trenutniDeo =[];

        foreach($reci as $rec){
            $trenutniDeo[]=$rec;

            //kada dostignemo limit reci zavrsi deo
            if(count($trenutniDeo) >= $velicinaDelova){
                $delovi[] = implode(' ',$trenutniDeo);
                $trenutniDeo=[];
            }
        }

        if(!empty($trenutniDeo)){
            $delovi[]=implode(' ',$trenutniDeo);
        }

        //$rezultati = str_split($sadrzaj, 4500);

        return $delovi;
    }

    public function documentsUsera(){
        $user = Auth::user();

        $documentsUsera = Document::with('reportovi')
            ->where('user_id',$user->id)
            ->get();
        
        return response()->json($documentsUsera);
    }
}