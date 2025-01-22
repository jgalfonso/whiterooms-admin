<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Mail\Confirmation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;


class MailController extends Controller
{   
    public function sendConfirmation(Request $request)
    {   
        $email = $request->query('email');
        $details = [
            'title' => 'Welcome!',
            'body' => 'Thank you for subscribing! Welcome to the wonderful world of Grayclay!',
        ];

        Mail::to($email)->send(new Confirmation($details));

        return 'Email sent successfully!';
    }
}