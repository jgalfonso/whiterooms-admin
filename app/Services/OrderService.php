<?php

namespace App\Services;

use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class OrderService
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

    public function getOrders()
    {   
        $response = $this->client->get("/rest/v1/orders?select=*,profiles(firstname,lastname),payments(payment_method_id),order_items(id)");
        //$response = $this->client->get("/rest/v1/orders?select=*,profiles(*),order_items(*,products(id,name,unit_price))");
        return json_decode($response->getBody(), true);
    }

    public function getOrder($id)
    {   
        $response = $this->client->get("/rest/v1/orders?id=eq.{$id}&select=*,profiles(firstname,lastname,email),shipping_address(firstname,lastname,phone_no,line_1,line_2,city,states(name),countries(name)),delivery_methods(name,fee),stores(name),payments(reference_no,payment_method_id,total,delivery_fee,discount,net,vouchers(name,code)),order_items(unit_price,qty,total,products(name,image))");
        return json_decode($response->getBody(), true);
    }

    public function edit($request)
    {   
        try {

            $response = $this->client->patch("/rest/v1/orders", [
                'query' => ['id' => 'eq.'.$request->id],
                'json' => [
                    'status' => $request->status
                ],
            ]);

            if ($response->getStatusCode() == 204) { return ['success' => true]; }
            else { return ['message' => 'Update failed']; }
        } catch (Exception $e) {

            return $e->getMessage();
        }   
    }
}
