<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Services\VoucherService;
use Illuminate\Http\Request;

class VoucherController extends Controller
{
    protected $voucherService;

    public function __construct(VoucherService $voucherService)
    {
        $this->voucherService = $voucherService;
    }

	public function index()
    {
        return view('vouchers.index');
    }

    public function getVouchers()
    {   
        $data = $this->voucherService->getVouchers();
        return response()->json(['data' => collect($data)]);
    }
}