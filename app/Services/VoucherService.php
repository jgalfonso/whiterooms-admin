<?php

namespace App\Services;

use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class VoucherService
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

    public function getVouchers()
    {   
        $response = $this->client->get("/rest/v1/vouchers?select=*,profiles(lastname,firstname,middlename)");
        return json_decode($response->getBody(), true);
    }

    public function store($request)
    {   
        try {

            for ($i = 1; $i <= $request->pax; $i++) {
                $response = $this->client->post("/rest/v1/vouchers", [
                    'json' => [
                        'code'              => Str::random(10),
                        'name'              => $request->name,
                        'description'       => $request->description,
                        'discount'          => $request->discount,
                        'status'            => 'New'

                    ],
                ]);

                if ($response->getStatusCode() != 201) { return ['message' => 'Insert failed']; }
            }

            return ['success' => true];
            
        } catch (Exception $e) {

            return $e->getMessage();
        }   
    }

    public function edit($request)
    {   
        try {

            $response = $this->client->patch("/rest/v1/vouchers", [
                'query' => ['id' => 'eq.'.$request->id],
                'json' => [
                    'user_id' => $request->userID,
                ],
            ]);

            if ($response->getStatusCode() == 204) { return ['success' => true]; }
            else { return ['message' => 'Update failed']; }
        } catch (Exception $e) {

            return $e->getMessage();
        }   
    }

    public function destroy($request)
    {   
        try {

            $response = $this->client->delete("/rest/v1/vouchers", [
                'query' => ['id' => 'eq.'.$request->id]
            ]);

            if ($response->getStatusCode() == 204) { return ['success' => true]; }
            else { return ['message' => 'Failed to delete voucher']; }
            
        } catch (Exception $e) {

            return $e->getMessage();
        }   
    }
}
