<?php

namespace App\Services;

use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class NotificationService
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

    public function store($request)
    {   
        try {

            $response = $this->client->post("/rest/v1/notifications", [
                'json' => [
                    'user_id'       => $request->userID,
                    'title'         => $request->title,
                    'message'       => $request->message,
                    'reference_id'  => $request->id
                ],
            ]);

            if ($response->getStatusCode() == 201) { return ['success' => true]; }
            else { return ['message' => 'Insert failed']; }
        } catch (Exception $e) {

            return $e->getMessage();
        }   
    }
}
