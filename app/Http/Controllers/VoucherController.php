<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Services\VoucherService;
use App\Services\UserService;
use Illuminate\Http\Request;

class VoucherController extends Controller
{
    protected $voucherService;
    protected $userService;

    public function __construct(VoucherService $voucherService, UserService $userService)
    {
        $this->voucherService = $voucherService;
        $this->userService = $userService;
    }

	public function index()
    {
        $subscribers = $this->userService->getSubscribers();
        return view('vouchers.index', compact('subscribers'));
    }

    public function getVouchers()
    {   
        $data = $this->voucherService->getVouchers();
        return response()->json(['data' => collect($data)]);
    }

    public function store(Request $request) 
    {   
        $data = $this->voucherService->store($request);
        echo json_encode($data);
    }

    public function edit(Request $request) 
    {   
        $data = $this->voucherService->edit($request);
        echo json_encode($data);
    }

    public function destroy(Request $request) 
    {   
        $data = $this->voucherService->destroy($request);
        echo json_encode($data);
    }
}