<?php

namespace App\Services;

use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class UserService
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

    public function getUsers()
    {   
        $response = $this->client->get("/rest/v1/profiles?is_admin=eq.1&select=*");
        return json_decode($response->getBody(), true);
    }

    public function getSubscribers()
    {   
        $response = $this->client->get("/rest/v1/profiles?is_admin=is.null&select=*");
        return json_decode($response->getBody(), true);
    }


    public function store(Request $request)
    {   
        try {
            
            $signupResponse = $this->client->post("/auth/v1/signup", [
                'json' => [
                    'email'    => $request->email,
                    'password' => $request->password,
                ],
            ]);
    
            // Check if signup was successful
            if ($signupResponse->getStatusCode() != 200 && $signupResponse->getStatusCode() != 201) {
                return ['message' => 'Signup failed'];
            }
    
            // Extract user ID from the signup response
            $signupData = json_decode($signupResponse->getBody(), true);
            $userId = $signupData['user']['id'] ?? null; // Adjust based on the actual response structure
    
            if (!$userId) {
                return ['message' => 'Failed to retrieve user ID'];
            }
            
            $response = $this->client->patch("/rest/v1/profiles", [
                'query' => ['id' => 'eq.'.$userId],
                'json' => [
                    'email'         => $request->email,
                    'lastname'      => $request->lastname,
                    'firstname'     => $request->firstname,
                    'middlename'    => $request->middlename,
                    'is_admin'      => 1
                ],
            ]);

            if ($response->getStatusCode() == 204) { return ['success' => true]; }
            else { return ['message' => 'Profile insertion failed']; }
        } catch (Exception $e) {

            return $e->getMessage();
        }   
    }

    public function edit($request, $token)
    {
        try {
            // Step 1: Update user profile in the `profiles` table
            $profileResponse = $this->client->patch("/rest/v1/profiles", [
                'query' => ['id' => 'eq.' . $request->id],
                'json' => [
                    'lastname'   => $request->lastname,
                    'firstname'  => $request->firstname,
                    'middlename' => $request->middlename,
                ],
            ]);

            if ($profileResponse->getStatusCode() != 204) {
                return ['message' => 'Profile update failed'];
            }

            // Step 2: Update user password in the authentication system (if provided)
            if (!empty($request->password)) {
                $authResponse = $this->client->put("/auth/v1/admin/users/{$request->id}", [
                    'headers' => [
                        'Authorization' => 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRvdWpnZmJ0Y2lhZ2dsbXloZ2lqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNzY3NzExMywiZXhwIjoyMDQzMjUzMTEzfQ.H5tmKensDE0l_nzERD-isI4Jfs8AUbOumIdBOC6SLpA', // Admin token to authorize the request
                        'Content-Type'  => 'application/json',  // Set content type to JSON
                    ],
                        'json' => [
                        'password' => $request->password,
                    ],
                ]);

                if ($authResponse->getStatusCode() != 200) {
                    return ['message' => 'Failed to update user password'];
                }
            }

            return ['success' => true];
        } catch (Exception $e) {
            return $e->getMessage();
        }
    }

    public function changePassword($request)
    {
        try {
           
            $authResponse = $this->client->put("/auth/v1/admin/users/{$request->query('id')}", [
                'headers' => [
                    'Authorization' => 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRvdWpnZmJ0Y2lhZ2dsbXloZ2lqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNzY3NzExMywiZXhwIjoyMDQzMjUzMTEzfQ.H5tmKensDE0l_nzERD-isI4Jfs8AUbOumIdBOC6SLpA', // Admin token to authorize the request
                    'Content-Type'  => 'application/json',  // Set content type to JSON
                ],
                    'json' => [
                    'password' => $request->query('password'),
                ],
            ]);

            if ($authResponse->getStatusCode() != 200) {
                return ['message' => 'Failed to update user password'];
            }
            
            return ['success' => true];
        } catch (Exception $e) {
            return $e->getMessage();
        }
    }

    public function deleteAccount($request)
    {
        try {
            $authResponse = $this->client->request('DELETE', "/auth/v1/admin/users/{$request->query('id')}", [
                'headers' => [
                    'Authorization' => 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRvdWpnZmJ0Y2lhZ2dsbXloZ2lqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNzY3NzExMywiZXhwIjoyMDQzMjUzMTEzfQ.H5tmKensDE0l_nzERD-isI4Jfs8AUbOumIdBOC6SLpA', // Admin token to authorize the request
                    'Content-Type'  => 'application/json',  // Set content type to JSON
                ],
            ]);

            if ($authResponse->getStatusCode() != 200) {
                return ['message' => 'Failed to delete user'];
            }
        
            return ['success' => true];
        } catch (Exception $e) {
            return $e->getMessage();
        }
    }

    public function deleteUserAccount($request)
    {
        try {
            $authResponse = $this->client->request('DELETE', "/auth/v1/admin/users/{$request->id}", [
                'headers' => [
                    'Authorization' => 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRvdWpnZmJ0Y2lhZ2dsbXloZ2lqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNzY3NzExMywiZXhwIjoyMDQzMjUzMTEzfQ.H5tmKensDE0l_nzERD-isI4Jfs8AUbOumIdBOC6SLpA', // Admin token to authorize the request
                    'Content-Type'  => 'application/json',  // Set content type to JSON
                ],
            ]);

            if ($authResponse->getStatusCode() != 200) {
                return ['message' => 'Failed to delete user'];
            }
        
            return ['success' => true];
        } catch (Exception $e) {
            return $e->getMessage();
        }
    }
}
