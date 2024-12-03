<div id="left-sidebar" class="sidebar mini_sidebar_on">
    <div class="navbar-brand">
        <a href="index.html"><img src="assets/images/logo.jpeg" alt="AMCSS Logo" class="img-fluid logo"><span style="margin-left: 5px;"><b>WHITEROOMS</b> V1.0</span></a>
        <button type="button" class="btn-toggle-offcanvas btn btn-sm float-right"><i class="lnr lnr-menu icon-close"></i></button>
    </div>

    <div class="sidebar-scroll">
        <div class="user-account" style="text-align: center; margin: 20px 10px 0 10px;">
            <div class="user_div">
                <img src="assets/images/avatar.jpg" class="user-photo" alt="User Profile Picture">
            </div>
            <div class="dropdown" style="margin-left: 0;">
                <span>Welcome,</span>
                <a href="javascript:void(0);" class="user-name" style="font-weight: 600;">{{  preg_replace('/@.*/', '', session('supabase_user.email')) }}</a>
                
            </div>                
        </div>  
        <nav id="left-sidebar-nav" class="sidebar-nav">
             <ul id="main-menu" class="metismenu">
                <li class="header">Main</li>
                <li class="{{ set_nav_status(['/']) }}">
                    <a href="/"><i class="icon-home"></i><span>Dashboard</span></a>
                </li>

                <li class="header">Setup</li>
                <li class="{{ set_nav_status(['inventory']) }}"><a href="{{ route('inventory') }}"><i class="icon-docs"></i><span>Manage Inventory</span></a></li>
              

                <li class="header">Transactions</li>
                <li><a href=""><i class="icon-basket"></i><span>Orders</span></a></li>
                <li><a href=""><i class="icon-credit-card"></i><span>Payments</span></a></li>
                <li><a href=""><i class="icon-share-alt"></i><span>Shipments</span></a></li>
                <li><a href=""><i class="icon-loop"></i><span>Returns</span></a></li>

                <li class="header">Utilities</li>
                <li>
                    <a href="#" class="has-arrow"><i class="icon-printer"></i><span>Reports</span></a>
                    <ul>
                        <li><a href="">Interest Payout</a></li>
                    </ul>
                </li>

                <li class="header">Manage Users</li>
                <li><a href=""><i class="icon-users"></i><span>Admin</span></a></li>
            </ul>
        </nav>     
    </div>
</div>
