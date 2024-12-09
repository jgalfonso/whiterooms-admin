<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Services\OrderService;
use Illuminate\Http\Request;

class OrderController extends Controller
{   
    protected $supabase;
    
    public function __construct(OrderService $orderService)
    {
        $this->supabase = $orderService;
    }

    public function index()
    { 
       return view('orders.index');
    }

    public function view($id)
    {  
        $data = $this->supabase->getOrder($id);
        return view('orders.view', compact('data'));
    }

    public function getOrders()
    {   
        $data = $this->supabase->getOrders();
        return response()->json(['data' => collect($data)]);
    }
}
