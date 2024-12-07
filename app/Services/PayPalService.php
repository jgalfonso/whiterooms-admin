<?php

namespace App\Services;

use GuzzleHttp\Client;

class PayPalService
{
    protected $client;
    protected $baseUrl;

    public function __construct()
    {
        $this->baseUrl = env('PAYPAL_URL');

        $this->client = new Client([
            'base_uri' => $this->baseUrl,
            'auth' => [env('PAYPAL_CLIENDID'), env('PAYPAL_SECRETID')],
        ]);
    }

    public function createOrder($amount)
    {
        $response = $this->client->post('/v2/checkout/orders', [
            'json' => [
                'intent' => 'CAPTURE',
                'purchase_units' => [
                    [
                        'amount' => [
                            'currency_code' => 'USD',
                            'value' => $amount,
                        ],
                    ],
                ],
                'application_context' => [
                    'return_url' => env('PAYPAL_RETURNURL').'/paypal/success',
                    'cancel_url' => env('PAYPAL_RETURNURL').'/paypal/cancelled',
                ],
            ],
        ]);

        return json_decode($response->getBody()->getContents(), true);
    }

    public function captureOrder($orderId)
    {
        $response = $this->client->post("/v2/checkout/orders/{$orderId}/capture",
        [
            'headers' => [
                'Content-Type' => 'application/json',
            ],
        ]);
        return json_decode($response->getBody()->getContents(), true);
    }
}
