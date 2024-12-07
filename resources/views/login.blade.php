<!doctype html>
<html lang="en">
<head>
    <title>Order Management & Sales System - Whiterooms | Login</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="description" content="Order Management & Sales System - Whiterooms V1.0">
    <meta name="author" content="Whiterooms, design by: j alfonso">

    <meta name="csrf-token" content="{{ csrf_token() }}" />
    
    <link rel="icon" href="{{ URL::asset('favicon.ico') }}" type="image/x-icon">
    <!-- VENDOR CSS -->
    <link rel="stylesheet" href="{{ URL::asset('assets/vendor/bootstrap/css/bootstrap.min.css') }}">
    <link rel="stylesheet" href="{{ URL::asset('assets/vendor/font-awesome/css/font-awesome.min.css') }}">
    <link rel="stylesheet" href="{{ URL::asset('assets/vendor/animate-css/vivify.min.css') }}">
    <link rel="stylesheet" href="{{ URL::asset('assets/vendor/sweetalert/sweetalert.css') }}">

    <!-- MAIN CSS -->
    <link rel="stylesheet" href="{{ URL::asset('assets/css/site.min.css') }}">
</head>

<body class="theme-cyan font-montserrat light_version">

    <!-- Page Loader -->
    <div class="page-loader-wrapper">
        <div class="loader">
            <div class="bar1"></div>
            <div class="bar2"></div>
            <div class="bar3"></div>
            <div class="bar4"></div>
            <div class="bar5"></div>
        </div>
    </div>

    <div class="pattern">
        <span class="red"></span>
        <span class="indigo"></span>
        <span class="blue"></span>
        <span class="green"></span>
        <span class="orange"></span>
    </div>

    <div id="wrapper">
        <div class="auth-main particles_js">
            <div class="auth_div vivify popIn">
                <div class="card">
                    <div class="body">
                        <div class="auth_brand" style="margin-bottom: 0;">
                            <a class="navbar-brand" href="javascript:void(0);"><img src="assets/images/logo.jpeg" class="d-inline-block align-top mr-2" alt="" style="width: 100px;"></a>
                        </div>

                        <span style="color: #000; font-size: 30px;"><b>WHITEROOMS</b> V1.0</span>
                        <p class="lead" style="margin-top: 30px;">Already have an account?</p>
                        
                        <form class="form-auth-small m-t-20">
                            <div class="form-group">
                                <label for="email" class="control-label sr-only">Email</label>
                                <input id="email" name="email" type="email" class="form-control round" placeholder="Email">
                            </div>
                            
                            <div class="form-group">
                                <label for="password" class="control-label sr-only">Password</label>
                                <input id="password" name="password" type="password" class="form-control round" placeholder="Password">
                            </div>
                            
                            <div class="form-group clearfix">
                                <label class="fancy-checkbox element-left">
                                    <input type="checkbox">
                                    <span>Remember me</span>
                                </label>								
                            </div>

                            <button id="login" name="login" type="button" class="btn btn-primary btn-round btn-block">LOGIN</button>
                            <div class="bottom">
                                <span class="helper-text m-b-10"><i class="fa fa-lock"></i> <a href="">Forgot password?</a></span>
                                <span style="display: none;">Don't have an account? <a href="">Register</a></span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div id="particles-js"></div>
        </div>
    </div>
    <!-- END WRAPPER -->

    <script src="{{ URL::asset('assets/bundles/libscripts.bundle.js') }}"></script>   
    <script src="{{ URL::asset('assets/bundles/vendorscripts.bundle.js') }}"></script> 
    <script src="{{ URL::asset('assets/bundles/mainscripts.bundle.js') }}"></script> 
    <script src="{{ URL::asset('assets/vendor/sweetalert/sweetalert.min.js') }}"></script>

    <script src="{{ URL::asset('js/login.js') }}"></script>

</body>
</html>