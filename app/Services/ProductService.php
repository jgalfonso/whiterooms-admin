<?php

namespace App\Services;

use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProductService
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

    public function getProducts()
    {   
        $response = $this->client->get("/rest/v1/products");
        return json_decode($response->getBody(), true);
    }

    public function getProduct($request)
    {   
        $response = $this->client->get("/rest/v1/products?id=eq.{$request->id}");
        return json_decode($response->getBody(), true);
    }

    public function store($request)
    {   
        try {

            $response = $this->client->post("/rest/v1/products", [
                'json' => [
                    'sku'               => Str::random(10),
                    'name'              => $request->name,
                    'description'       => $request->description,
                    'qty'               => $request->qty,
                    'unit_price'        => $request->unitPrice,
                    'discount'          => $request->discount,
                    'net_price'         => $request->net,
                    'image'             => $request->thumbnailPath,
                    'is_new_arrival'    => $request->isNewarrival?:null,
                    'is_recommended'    => $request->isRecommended?:null,
                    'is_featured'       => $request->isFeatured?:null,
                    'is_best_selling'   => $request->isBestselling?:null,
                    'is_discounted'     => $request->discount?1:null,
                    'category_type_id'  => 1,
                    'status'            => 'Active'

                ],
            ]);

            if ($response->getStatusCode() == 201) { return ['success' => true]; }
            else { return ['message' => 'Insert failed']; }
        } catch (Exception $e) {

            return $e->getMessage();
        }   
    }

    public function edit($request)
    {   
        try {

            $response = $this->client->patch("/rest/v1/products", [
                'query' => ['id' => 'eq.'.$request->id],
                'json' => [
                    'name'              => $request->name,
                    'description'       => $request->description,
                    'qty'               => $request->qty,
                    'unit_price'        => $request->unitPrice,
                    'discount'          => $request->discount,
                    'net_price'         => $request->net,
                    'image'             => $request->thumbnailPath,
                    'is_new_arrival'    => $request->isNewarrival?:null,
                    'is_recommended'    => $request->isRecommended?:null,
                    'is_featured'       => $request->isFeatured?:null,
                    'is_best_selling'   => $request->isBestselling?:null,
                    'is_discounted'     => $request->discount?1:null
                ],
            ]);

            if ($response->getStatusCode() == 204) { return ['success' => true]; }
            else { return ['message' => 'Update failed']; }
        } catch (Exception $e) {

            return $e->getMessage();
        }   
    }
}
