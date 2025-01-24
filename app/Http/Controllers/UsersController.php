<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Services\UserService;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

	public function index()
    {
        return view('users.index');
    }

    public function getUsers()
    {   
        $data = $this->userService->getUsers();
        return response()->json(['data' => collect($data)]);
    }

    public function store(Request $request) 
    {   
        $data = $this->userService->store($request);
        echo json_encode($data);
    }

    public function edit(Request $request) 
    {   
        $token = session('supabase_token');
        $data = $this->userService->edit($request, $token);
        echo json_encode($data);
    }

    public function changePassword(Request $request) 
    {   
        $data = $this->userService->changePassword($request);
        echo json_encode($data);
    }

    public function deleteAccount(Request $request) 
    {   
        $data = $this->userService->deleteAccount($request);
        echo json_encode($data);
    }
}