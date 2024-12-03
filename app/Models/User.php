<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Laravel\Sanctum\HasApiTokens;
use Carbon\Carbon;

//use App\Notifications\PasswordRequest;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    public $primaryKey = 'user_id';

    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'fullname',
        'email',
        'password',
        'created_by',
        'status'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        //'email_verified_at' => 'datetime',
    ];

    public static function logIn($request)
    {   
        try {

            $credentials = $request->only('email', 'password');

            if (Auth::attempt($credentials)) {

                $user = Auth::user(); 

                return ['success' => true];
            } 
            else return ['success' => false, 'message' => 'Unauthorised, the email and password you entered is incorrect.'];
        } catch (Throwable $e) {

            return  $e->getMessage();
        }
    }

    public static function logOut()
    {   
        try {
            Auth::logout();

            return true;
        } catch (Exception $e) {

            return $e->getMessage();
        }   
    }
}
