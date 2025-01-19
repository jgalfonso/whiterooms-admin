<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Services\NotificationService;
use App\Services\OrderService;
use Illuminate\Http\Request;

class OrderController extends Controller
{   
    protected $notification;
    protected $supabase;

    public function __construct(NotificationService $notification, OrderService $orderService)
    {
        $this->notification = $notification;
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

    public function edit(Request $request) 
    {   
        $data = $this->supabase->edit($request);

        if($request->status == 'For Packing') {
            $request->merge(['title' => 'Order Preparation']);
            $request->merge(['message' => "Your order {$request->referenceNo} is being prepared for packing. Kindly wait for your shipment."]);
            $this->notification->store($request);
        }
        else if($request->status == 'Packed') {
            $request->merge(['title' => 'Packed']);
            $request->merge(['message' => "Your order {$request->referenceNo} is now being packed. Kindly wait for your shipment."]);
            $this->notification->store($request);
        }
        else if($request->status == 'For Shipping') {
            $request->merge(['title' => 'Shipment Preparation']);
            $request->merge(['message' => "Your order {$request->referenceNo} is being prepared for shipping. Kindly wait for further updates."]);
            $this->notification->store($request);
        }
        else if($request->status == 'Shipped') {
            $request->merge(['title' => 'Order Shipped']);
            $request->merge(['message' => "Your order {$request->referenceNo} has been shipped. Kindly wait for its arrival."]);
            $this->notification->store($request);
        }
        else {
            $request->merge(['title' => 'Delivered Successfully']);
            $request->merge(['message' => "Your order {$request->referenceNo} has been delivered. Thank you for choosing us!"]);
            $this->notification->store($request);
        }
        
        echo json_encode($data);
    }
}
