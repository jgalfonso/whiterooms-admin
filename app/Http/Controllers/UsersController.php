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

    public function getByList(Request $request)
    {   
        $request->request->add(['per_page' => $request->input('length')]);
        $request->request->add(['page' => (intval($request->input('start')) / intval($request->input('length'))) + 1]);
        $data = User::getByList($request);

        return response()->json($data);
    }

    public function store(Request $request) 
    {   
        $data = User::store($request);

        echo json_encode($data);
    }

    public function edit(Request $request) 
    {   
        $data = User::edit($request);

        echo json_encode($data);
    }
}