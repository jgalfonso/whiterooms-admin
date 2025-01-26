<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Services\OrderService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MainController extends Controller
{
    protected $orderService;

    public function __construct(OrderService $orderService)
    {
        $this->orderService = $orderService;
    }


	public function index()
    {
        $summary = $this->orderService->getSummary();
        $data = $this->orderService->getTopSelling();
        return view('index', compact('summary', 'data'));
    }
}
