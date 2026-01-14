<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthenticationController extends Controller
{
    public function register(Request $request){

        $validator = Validator::make($request->all(), [
            'username'=>'required|string|max:255',
            'email'=>'required|string|max:255|email|unique:users',
            'password'=>'required|string|min:8'
        ]);

        if($validator->fails()){
            return response()->json($validator->errors());
        }

        $user = User::create([
            'name'=>$request->username,
            'email'=>$request->email,
            'password'=> Hash::make($request->password)
        ]);

        $tokenResult = $user->createToken('auth_token');
        $token = $tokenResult->accessToken;

        return reponse()->json([
            'data' => $user,
            'access_token' =>$token,
            'token_type' => 'Bearer'
        ],200);
    }
}
