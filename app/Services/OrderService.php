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
        $response = $this->client->get("/rest/v1/orders?select=*,profiles(firstname,lastname),payments(payment_method_id),order_items(id)&order=created_at.desc");
        //$response = $this->client->get("/rest/v1/orders?select=*,profiles(*),order_items(*,products(id,name,unit_price))");
        return json_decode($response->getBody(), true);
    }

    public function getSummary()
    {   
        $response = $this->client->get("/rest/v1/orders?select=*");
        if ($response->getStatusCode() === 200) {
            
            $orders = json_decode($response->getBody(), true);
            $statusCounts = [
                'New' => 0,
                'Packed' => 0,
                'For Shipping' => 0,
                'Delivered' => 0
            ];
            
            foreach ($orders as $order) {
                if (isset($statusCounts[$order['status']])) {
                    $statusCounts[$order['status']]++;
                }
            }

            return (object)$statusCounts;
        } else {
            return $response->getStatusCode();
        }
    }

    public function getTopSelling()
    {
        $response = $this->client->get("/rest/v1/order_items?select=qty,product_id,products(name)&order=qty.desc&limit=5");
        
        if ($response->getStatusCode() === 200) {
            
            $orders = json_decode($response->getBody(), true);
            $topSellingProducts = [];
            
            foreach ($orders as $order) {
                $topSellingProducts[] = [
                    'product_name' => $order['products']['name'],
                    'quantity_sold' => $order['qty'],
                ];
            }

            return $topSellingProducts;
        } else {
            return $response->getStatusCode();
        }
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
