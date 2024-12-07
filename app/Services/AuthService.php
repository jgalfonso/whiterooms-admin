<?php

namespace App\Services;

use GuzzleHttp\Client;
use Illuminate\Http\Request;

class AuthService
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
                'apiKey' => $this->key,
            ],
        ]);
    }

    // Sign up a new user
    public function signUp($email, $password)
    {
        $response = $this->client->post("/auth/v1/signup", [
            'json' => compact('email', 'password'),
        ]);

        return json_decode($response->getBody(), true);
    }

    // Sign in an existing user
    public function logIn(Request $request)
    {
        try {
            $response = $this->client->post('/auth/v1/token?grant_type=password', [
                'json' => [
                    'email' =>  $request->email,
                    'password' => $request->password
                ],
            ]);
            return json_decode($response->getBody(), true);
        } catch (RequestException $e) {
            dd($e);
            return [
                'error' => $e->getMessage(),
                'details' => $e->getResponse() ? $e->getResponse()->getBody()->getContents() : null,
            ];
        }
    }
    

    // Get user details
    public function getUser($accessToken)
    {
        $response = $this->client->get("/auth/v1/user", [
            'headers' => [
                'Authorization' => 'Bearer ' . $accessToken,
            ],
        ]);

        return json_decode($response->getBody(), true);
    }

    // Logout user
    public function logOut($accessToken)
    {
        $response = $this->client->post("/auth/v1/logout", [
            'headers' => [
                'Authorization' => 'Bearer ' . $accessToken,
            ],
        ]);

        return $response->getStatusCode() === 204; // Supabase returns 204 for successful logout
    }
}
