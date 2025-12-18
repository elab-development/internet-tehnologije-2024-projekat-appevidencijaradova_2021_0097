<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

Route::get('/test', function () {
    return response()->json([
        'message' => 'api radi'
    ]);
});

Route::get('/users',[UserController::class,'index']);