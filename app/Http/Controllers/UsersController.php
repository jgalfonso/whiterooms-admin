<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Models\User;

class UsersController extends Controller
{
	public function index()
    {
        $user = Auth::user();
        
        return view('users.users', compact('user'));
    }
}