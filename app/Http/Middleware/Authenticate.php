<?php


//namespace App\Http\Middleware;

//use Illuminate\Auth\Middleware\Authenticate as Middleware;

//class Authenticate extends Middleware
//{
//    /**
//    * Get the path the user should be redirected to when they are not authenticated.
//     *
//     * @param  \Illuminate\Http\Request  $request
//     * @return string|null
//     */
//    protected function redirectTo($request)
//    {
//        if (! $request->expectsJson()) {
//            return route('/');
//        }
//    }
//}

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class Authenticate 
{
    public function handle($request, Closure $next) {
        
      if(Auth::user()) {
            if (call_user_func_array('Request::is', (array) ['login'])) return redirect('/');

            return $next($request); 
        }
        else {
             if (call_user_func_array('Request::is', (array) ['sign-in'])) return $next($request);

             return redirect('login');
        }
   }
}