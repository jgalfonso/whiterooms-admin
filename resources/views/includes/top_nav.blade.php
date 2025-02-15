<div class="navbar-left" style="margin-left: 15px;">
    <div class="navbar-btn">
        <a href="index.html"><img src="{{ URL::asset('assets/images/icon.png') }}" alt="Whiterooms Logo" class="img-fluid logo"></a>
        <button type="button" class="btn-toggle-offcanvas"><i class="lnr lnr-menu fa fa-bars"></i></button>
    </div>

    <ul class="nav navbar-nav">
        <li class="dropdown">
            <a href="javascript:void(0);" class="dropdown-toggle icon-menu" data-toggle="dropdown" style="display: none;">
                <i class="icon-bell"></i>
                <span class="notification-dot bg-azura">4</span>
            </a>
            <ul class="dropdown-menu feeds_widget vivify fadeIn">
                <li class="header blue">You have 4 New Notifications</li>
                <li>
                    <a href="javascript:void(0);">
                        <div class="feeds-left bg-red"><i class="fa fa-check"></i></div>
                        <div class="feeds-body">
                            <h4 class="title text-danger">Issue Fixed <small class="float-right text-muted">9:10 AM</small></h4>
                            <small>WE have fix all Design bug with Responsive</small>
                        </div>
                    </a>
                </li>                               
                <li>
                    <a href="javascript:void(0);">
                        <div class="feeds-left bg-info"><i class="fa fa-user"></i></div>
                        <div class="feeds-body">
                            <h4 class="title text-info">New User <small class="float-right text-muted">9:15 AM</small></h4>
                            <small>I feel great! Thanks team</small>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="javascript:void(0);">
                        <div class="feeds-left bg-orange"><i class="fa fa-question-circle"></i></div>
                        <div class="feeds-body">
                            <h4 class="title text-warning">Server Warning <small class="float-right text-muted">9:17 AM</small></h4>
                            <small>Your connection is not private</small>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="javascript:void(0);">
                        <div class="feeds-left bg-green"><i class="fa fa-thumbs-o-up"></i></div>
                        <div class="feeds-body">
                            <h4 class="title text-success">2 New Feedback <small class="float-right text-muted">9:22 AM</small></h4>
                            <small>It will give a smart finishing to your site</small>
                        </div>
                    </a>
                </li>
            </ul>
        </li>    
    </ul>
</div>

<div class="navbar-right">
    <div id="navbar-menu">
        <ul class="nav navbar-nav">
            <li  style="display: none;"><a href="javascript:void(0);" class="search_toggle icon-menu" title="Search Result"><i class="icon-magnifier"></i></a></li>                        
            <li><a onclick="logOut();" href="javascript:void(0)" class="icon-menu"><i class="icon-power"></i></a></li>
        </ul>
    </div>
</div>