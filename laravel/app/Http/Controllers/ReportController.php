<?php

namespace App\Http\Controllers;

use App\Models\Document;
use App\Models\Report;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ReportController extends Controller
{
    public function checkPlagiarism($file_id)
    {
        Log::info("checkPlagiarism je pozvan");
        ini_set('max_execution_time', 300); // 300 sekundi = 5 minuta

        $apiKey = env('PREPOSTSEO_KEY');
        $strings=DocumentController::file_u_tekst($file_id);
        $dokument = Document::find($file_id);
    
        if (!$dokument) {
            return response()->json(['error' => 'Document not found'], 404);
        }

        if (empty($strings)) {
            return response()->json(['error' => 'No text to check'], 400);
}


        $ukupnoReci = 0;
        $plagPonderisanaSuma =0;
        $paraphrasePonderisanaSuma=0;

        foreach($strings as $text){
            try{
                $brojReci = count(preg_split('/\s+/', trim($text)));


                $response = Http::asForm()->post('https://www.prepostseo.com/apis/checkPlag',[
                    'key' => $apiKey,
                    'data' => $text
                ]);

                if($response->failed()){
                    return response()->json([
                        'error'=>'Prepostseo API zahtev je pukao',
                        'status' => $response->status(),
                        'body' => $response->body()
                    ],500);
                }

                $result = $response->json();


                //validacija odgovora
                if(!isset($result['plagPercent']) || !isset($result['paraphrasePercent'])){
                    return response()->json([
                        'error' =>'Invalid API response',
                        'data' =>$result
                    ],500);
                }

                //ponderisani zbir
                $ukupnoReci += $brojReci;
                $plagPonderisanaSuma += $result['plagPercent']*$brojReci;
                $paraphrasePonderisanaSuma += $result['paraphrasePercent']*$brojReci;

            }catch(\Exception $e){
                return response()->json([
                    'error' => 'Dogodio se exception',
                    'poruka' => $e->getMessage()
                ],500);
            }
        }

        if ($ukupnoReci === 0) {
            return response()->json(['error' => 'No words found in document'], 400);
        }


        $plagPercent = $plagPonderisanaSuma/$ukupnoReci;
        $paraphrasePercent = $paraphrasePonderisanaSuma/$ukupnoReci;

        $report = Report::create([
            'plagPercent' =>$plagPercent,
            'paraphrasePercent'=>$paraphrasePercent,
            'document_id' => $dokument->id
        ]);

        return response()->json($report);
    
       
    }
}