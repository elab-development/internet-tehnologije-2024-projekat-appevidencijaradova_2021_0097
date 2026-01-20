<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;


class ContactController extends Controller
{
    public function send(Request $request)
    {
        Log::channel('messages')->info('Contact message', [
            'name' => $request->name,
            'email' => $request->email,
            'message' => $request->message,
        ]);

        return response()->json(['message' => 'Poruka poslata']);
    }
}
