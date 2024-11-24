<div id="left-sidebar" class="sidebar">
    <div class="navbar-brand">
        <a href="/"><img src="/assets/images/logo.png" alt="OR-ITS Logo" class="img-fluid logo"><span style="margin-left: 5px;"><b>OR-ITS</b> EAMC</span></a>
        <button type="button" class="btn-toggle-offcanvas btn btn-sm float-right"><i class="lnr lnr-menu icon-close"></i></button>
    </div>
    <div class="sidebar-scroll">
        <div class="user-account" style="text-align: center; margin: 20px 10px 0 10px;">
            <div class="user_div">
                <img src="/assets/images/avatar.jpg" class="user-photo" alt="User Profile Picture">
            </div>
            <div class="dropdown">
                <span>Welcome,</span>
                <a href="javascript:void(0);" class="user-name"><strong>{{ $user->fullname }}</strong></a>
                
            </div>                
        </div>  
        <nav id="left-sidebar-nav" class="sidebar-nav">
             <ul id="main-menu" class="metismenu">
                <li class="header">Main</li>

                 <li class="active">
                    <a href="/"><i class="icon-home"></i><span>Home</span></a>
                </li>
                
                <li class="header">Assembly</li>

                <li class="{{ set_nav_status(['inventory/*']) }}">
                    <a href="#" class="has-arrow"><i class="icon-folder-alt"></i><span>Manage Inventory</span></a>

                    <ul>
                        <li class="{{ set_nav_status(['inventory/containers']) }}"><a href="{{ route('containers') }}">Containers</a></li>
                        <li class="{{ set_nav_status(['inventory/instruments']) }}"><a href="{{ route('instruments') }}">Instruments</a></li>
                        <li class="{{ set_nav_status(['inventory/available']) }}"><a href="{{ route('available') }}">Available</a></li>
                    </ul>
                </li>

                <li class="header">Services</li>

                <li class="{{ set_nav_status(['issuance/*']) }}">
                    <a href="#" class="has-arrow"><i class="icon-doc"></i><span>Issuance</span></a>

                    <ul>
                        <li class="{{ set_nav_status(['issuance/new']) }}"><a href="{{ route('issuance-new') }}">New</a></li>
                        <li class="{{ set_nav_status(['issuance/released']) }}"><a href="{{ route('issuance-released') }}">Released Item/s</a></li>
                    </ul>
                </li>

                 <li class="{{ set_nav_status(['returns/*']) }}">
                    <a href="{{ route('returns-new') }}"><i class="icon-loop"></i><span>Returns</span></a>
                </li>


                <li class="{{ set_nav_status(['tally/*']) }}">
                    <a href="#" class="has-arrow"><i class="icon-docs"></i><span>Tally / Checking</span></a>

                    <ul>
                        <li class="{{ set_nav_status(['tally/checking']) }}"><a href="{{ route('checking') }}">Checking</a></li>
                        <li class="{{ set_nav_status(['tally/missing']) }}"><a href="{{ route('missing') }}">Missing / Pending Items</a></li>
                    </ul>
                </li>

                <li class="header" style="display: none;">Utilities</li>

                <li style="display: none;">
                    <a href="#" class="has-arrow"><i class="icon-printer"></i><span>Reports</span></a>
                    <ul>
                        <li><a href=""></a></li>
                    </ul>
                </li>

                <li class="header">Manage Users</li>
                <li class="{{ set_nav_status(['users/*']) }}"><a href="{{ route('users') }}"><i class="icon-users"></i><span>Users</span></a></li>

            </ul>
        </nav>     
    </div>
</div>
