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
}