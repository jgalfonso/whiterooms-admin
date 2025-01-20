<?php

namespace App\Services;

use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PaymentService
{
    protected $client;
    protected $url;
    protected $key;

    public function __construct()
    {
        $this->url = env('SUPABASE_URL');
        $this->key = env('SUPABASE_KEY');
        $this->client = new Client([
            'base_uri' => $this->url,
            'headers' => [
                'Authorization' => 'Bearer ' . env('SUPABASE_KEY'),
                'apiKey' => $this->key,
            ],
        ]);
    }


    public function getPayments()
    {   
        $response = $this->client->get("/rest/v1/orders?select=*,profiles(firstname,lastname),payments(reference_no,payment_method_id,total,discount,delivery_fee,net,created_at)&order=created_at.desc");
        return json_decode($response->getBody(), true);
    }
}
