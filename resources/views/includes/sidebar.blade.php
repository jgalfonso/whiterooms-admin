<div id="left-sidebar" class="sidebar mini_sidebar_on">
    <div class="navbar-brand">
        <a href="index.html"><img src="{{ URL::asset('assets/images/icon.png') }}" alt="Grayclay Logo" class="img-fluid logo"><span style="margin-left: 5px; font-size: 16px;"><b>GRAYCLAY</b> SKIN CARE</span></a>
        <button type="button" class="btn-toggle-offcanvas btn btn-sm float-right"><i class="lnr lnr-menu icon-close"></i></button>
    </div>

    <div class="sidebar-scroll">
        <div class="user-account" style="text-align: center; margin: 20px 10px 0 10px;">
            <div class="user_div">
                <img src="{{ URL::asset('assets/images/avatar2.png') }}"  class="user-photo" alt="User Profile Picture">
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
                <li class="{{ set_nav_status(['transactions/orders*']) }}"><a href="{{ route('orders') }}"><i class="icon-basket"></i><span>Orders</span></a></li>
                <li class="{{ set_nav_status(['transactions/payments*']) }}"><a href="{{ route('payments') }}"><i class="icon-credit-card"></i><span>Payments</span></a></li>
                <li class="{{ set_nav_status(['transactions/shipments*']) }}"><a href="{{ route('shipments') }}"><i class="icon-share-alt"></i><span>Shipments</span></a></li>
                <li style="display: none;" class="{{ set_nav_status(['transactions/returns*']) }}"><a href="{{ route('returns') }}"><i class="icon-loop"></i><span>Returns</span></a></li>
                <li class="{{ set_nav_status(['transactions/vouchers*']) }}"><a href="{{ route('vouchers') }}"><i class="icon-tag"></i><span>Vouchers</span></a></li>
                <li style="display: none;" class="{{ set_nav_status(['transactions/chat*']) }}"><a href="{{ route('chat') }}"><i class="icon-bubbles"></i><span>Chat Support</span></a></li>

                <li class="header" style="display: none;">Utilities</li>
                <li style="display: none;">
                    <a href="#" class="has-arrow"><i class="icon-printer"></i><span>Reports</span></a>
                    <ul>
                        <li><a href="">Interest Payout</a></li>
                    </ul>
                </li>

                <li class="header">Manage Users</li>
                <li class="{{ set_nav_status(['users/admin*']) }}"><a href="{{ route('admin') }}"><i class="icon-users"></i><span>Admin</span></a></li>
                <li class="{{ set_nav_status(['users/subscribers*']) }}"><a href="{{ route('subscribers') }}"><i class="icon-users"></i><span>Subscribers</span></a></li>
            </ul>
        </nav>     
    </div>
</div>
