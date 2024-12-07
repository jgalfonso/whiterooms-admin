<?php

namespace App\Http\Controllers;

use App\Services\PayPalService;
use Illuminate\Http\Request;

class PayPalController extends Controller
{
    protected $paypalService;

    public function __construct(PayPalService $paypalService)
    {
        $this->paypalService = $paypalService;
    }

    public function createOrder(Request $request)
    {
        $order = $this->paypalService->createOrder($request->amount);
        return response()->json($order);
    }

    public function captureOrder(Request $request)
    {
        $result = $this->paypalService->captureOrder($request->orderId);
        return response()->json($result);
    }

    public function success(Request $request)
    {
        $orderId = $request->query('token');
        $payerId = $request->query('PayerID'); 
        
        if (!$orderId || !$payerId) {
            return response()->json(['error' => 'Missing token or PayerID'], 400);
        }

        try {
            
            $response = $this->paypalService->captureOrder($orderId);
            if ($response['status'] === 'COMPLETED') {
                
                return view('paypal.success', ['order' => $response]);
            } else {
                
                return response()->json(['error' => 'Payment not completed'], 400);
            }
        } catch (\Exception $e) {
           
            return response()->json(['error' => 'Failed to capture payment', 'message' => $e->getMessage()], 500);
        }
    }

    public function cancelled()
    {
        return view('paypal.cancelled');
    }
}
