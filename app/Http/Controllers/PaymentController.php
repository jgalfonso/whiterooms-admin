<?php

namespace App\Http\Controllers;

use App\Services\PaymentService;
use App\Services\StripeService;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    protected $paymentService;
    protected $stripeService;

    public function __construct(PaymentService $paymentService, StripeService $stripeService)
    {
        $this->paymentService = $paymentService;
        $this->stripeService = $stripeService;
    }

    public function index()
    { 
        return view('payments.index');
    }

    public function getPayments()
    {   
        $data = $this->paymentService->getPayments();
        return response()->json(['data' => collect($data)]);
    }

    /**
     * Create and return a Stripe payment intent.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function createPaymentIntent(Request $request)
    {
        try {
            // Create payment intent
            $paymentIntent = $this->stripeService->createPaymentIntent($request);

            return response()->json([
                'payment_intent_id' => $paymentIntent->id,
                'client_secret' => $paymentIntent->client_secret,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
