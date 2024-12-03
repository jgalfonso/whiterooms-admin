<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Services\AuthService;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    protected $supabase;

	public function index()
    {
        return view('login');
    }

    public function __construct(AuthService $authService)
    {
        $this->supabase = $authService;
    }

    public function in(Request $request) 
    {   
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $response = $this->supabase->logIn($request);
        if (isset($response['access_token'])) {
            session(['supabase_token' => $response['access_token']]);
            session(['supabase_user' => $response['user']]);
        }

        return response()->json($response);
    }

    public function out(Request $request) 
    {   
        $token = session('supabase_token');
        if (!$token) {
            return response()->json(['error' => 'Not authenticated'], 401);
        }

        $result = $this->supabase->logOut($token);
        session()->forget('supabase_token');
        session()->forget('supabase_user');

        return response()->json(['success' => $result]);
    }
}