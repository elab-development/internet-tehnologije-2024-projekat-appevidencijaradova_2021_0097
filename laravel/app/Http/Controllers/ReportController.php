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
        $uniquePonderisanaSuma=0;

        foreach($strings as $text){
            try{
                $brojReci = count(preg_split('/\s+/', trim($text)));


                $response = Http::asForm()->post('https://www.prepostseo.com/apis/checkPlag',[
                    'key' => $apiKey,
                    'data' => $text
                ]);

                

                $result = $response->json();

                Log::info('Prepostseo API response', [
                        'file_id' => $file_id,
                        'word_count' => $brojReci,
                        'response' => $result
                    ]);

                //ponderisani zbir
                $ukupnoReci += $brojReci;

                $plag = $result['plagPercent'] ?? 0;
                $unique = $result['uniquePercent'] ?? 0;
                $plagPonderisanaSuma += $plag*$brojReci;
                $uniquePonderisanaSuma += $unique*$brojReci;

            }catch(\Exception $e){
                $results[]=['error' =>$e->getMessage()];
            }
        }

        if ($ukupnoReci === 0) {
            return response()->json(['error' => 'No words found in document'], 400);
        }


        $plagPercent = $plagPonderisanaSuma/$ukupnoReci;
        $uniquePercent = $uniquePonderisanaSuma/$ukupnoReci;

        $report = Report::create([
            'plagPercent' =>$plagPercent,
            'uniquePercent'=>$uniquePercent,
            'document_id' => $dokument->id
        ]);

        return response()->json($report);
    
       
    }
}