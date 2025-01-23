<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Mail\Confirmation;
use App\Mail\Order;
use App\Mail\VerificationCode;
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

    public function sendPayment(Request $request)
    {   
        $email = $request->query('email');
        $details = [
            'title' => $request->query('title'),
            'body' => $request->query('message'),
        ];

        Mail::to($email)->send(new Order($details));
        
        return 'Email sent successfully!';
    }

    public function sendVerificationCode(Request $request)
    {   
        $email = $request->query('email');
        $details = [
            'code' => $request->query('code'),
        ];

        Mail::to($email)->send(new VerificationCode($details));
        
        return 'Email sent successfully!';
    }
}