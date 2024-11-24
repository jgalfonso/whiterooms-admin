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

    public static function getByList($request)
    {
        $users = self::orderBy('fullname')->paginate($request->per_page?$request->per_page:$request->page);

        $json = array(
            "draw"            => intval($request->input('draw')),
            "recordsTotal"    => intval($users->total()),
            "recordsFiltered" => intval($users->total()),
            "data"            => $users->items(),
            "start"           => intval($request->input('start'))
        );

        return $json;
    }

    public static function store($request)
    {       
        try {
           
            $request->validate([
                'email'     => 'required|string|unique:users',
                'password'  => 'required|string|min:8'
            ]);

            $data = [
                'fullname'      => $request->fullname,
                'email'         => $request->email,
                'password'      => Hash::make($request->password),
                'dt_created'    => date('Y-m-d H:i:s'), 
                'status'        => 'Active'
            ];

            self::insert($data);
            
            return ['success' => true];
        } catch (Exception $e) {

            return $e->getMessage();
        }   
    }

    public static function edit($request)
    {       
        try {
           
            $request->validate(['password'  => 'required|string|min:8']);

            $data = [
                'fullname'      => $request->fullname,
                'password'      => Hash::make($request->password),
                'lupd_by'       => Auth::user()->user_id, 
                'dt_lupd'       => date('Y-m-d H:i:s')
            ];

            self::where('user_id', $request->userID)->update($data);
            
            return ['success' => true];
        } catch (Exception $e) {

            return $e->getMessage();
        }   
    }
}
