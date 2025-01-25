<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Services\UserService;
use Illuminate\Http\Request;

class SubscribersController extends Controller
{
    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

	public function index()
    {
        return view('subscribers.index');
    }

    public function getSubscribers()
    {   
        $data = $this->userService->getSubscribers();
        return response()->json(['data' => collect($data)]);
    }

    public function deleteAccount(Request $request) 
    {   
        $data = $this->userService->deleteUserAccount($request);
        echo json_encode($data);
    }
}