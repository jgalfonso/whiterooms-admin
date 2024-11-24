<head>
    <title>Information Tracking System - EAMC | @yield('title')</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="description" content="HMMS - EAMC V1.0">
    <meta name="author" content="Datadynamix, design by: j alfonso">

    <meta name="csrf-token" content="{{ csrf_token() }}" />
    
    <link rel="icon" href="{{ URL::asset('favicon.png') }}" type="image/x-icon">

    <!-- VENDOR CSS -->
    <link rel="stylesheet" href="{{ URL::asset('assets/vendor/bootstrap/css/bootstrap.min.css') }}">
    <link rel="stylesheet" href="{{ URL::asset('assets/vendor/font-awesome/css/font-awesome.min.css') }}">
    <link rel="stylesheet" href="{{ URL::asset('assets/vendor/animate-css/vivify.min.css') }}">    

    @yield('css')

    <!-- MAIN CSS -->
    <link rel="stylesheet" href="{{ URL::asset('assets/css/site.min.css') }}">
    <link rel="stylesheet" href="{{ URL::asset('css/custom.css') }}">
</head>


