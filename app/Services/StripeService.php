<?php

namespace App\Services;

use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\PaymentIntent;
use Stripe\Exception\ApiErrorException;

class StripeService
{
    public function __construct()
    {
        // Set the Stripe secret key
        Stripe::setApiKey('sk_test_51QMU1pKg4yO6KcQdprlMSE9B9Qesya5mpmO2cKD80yBMwI7zUHGxgkAIKpXDxhZ2RgIkkbO9fcIShsmHuo88ivcI00Qv59LiDo');
    }

    /**
     * Create a PaymentIntent based on request.
     *
     * @param Illuminate\Http\Request
     * @return \Stripe\PaymentIntent
     * @throws \Stripe\Exception\ApiErrorException
     */
    public function createPaymentIntent(Request $request)
    {
        try {
            $paymentIntent = PaymentIntent::create([
                'amount' => $request->amount,
                'currency' => 'usd', 
                'metadata' => [
                    'email' => $request->email, 
                ],
            ]);

            return $paymentIntent;
        } catch (ApiErrorException $e) {
            // Handle API errors
            throw new \Exception('Error creating payment intent: ' . $e->getMessage());
        }
    }
}
