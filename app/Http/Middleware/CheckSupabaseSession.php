<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckSupabaseSession
{
    public function handle(Request $request, Closure $next)
    {   
        if (!session('supabase_token')) {
            return redirect('login');
        }

        return $next($request);
    }
}
