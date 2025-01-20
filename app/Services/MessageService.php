<?php

namespace App\Services;

use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class MessageService
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


    public function getMessages($id)
    {   
        $response = $this->client->get("/rest/v1/messages?order_id=eq.{$id}&select=*&order=created_at.asc");
        return json_decode($response->getBody(), true);
    }

    public function store($request)
    {   
        try {

            $response = $this->client->post("/rest/v1/messages", [
                'json' => [
                    'order_id'  => $request->orderID,
                    'user_id'   => $request->userID,
                    'body'      => $request->body,
                    'is_admin'  => 1
                ],
            ]);

            if ($response->getStatusCode() == 201) { return ['success' => true]; }
            else { return ['message' => 'Insert failed']; }
        } catch (Exception $e) {

            return $e->getMessage();
        }   
    }
}
