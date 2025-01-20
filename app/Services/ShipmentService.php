<?php

namespace App\Services;

use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ShipmentService
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


    public function getShipments()
    {   
        $response = $this->client->get("/rest/v1/orders?status=eq.Shipped&select=*,profiles(firstname,lastname,email),shipping_address(firstname,lastname,phone_no,line_1,line_2,city,states(name),countries(name)),delivery_methods(name,fee),stores(name),order_items(id)&order=created_at.desc");
        return json_decode($response->getBody(), true);
    }
}
