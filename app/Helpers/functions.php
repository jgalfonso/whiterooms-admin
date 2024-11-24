<?php

if (!function_exists('set_nav_status')) {
    function set_nav_status($path, $active = 'active') {
        return call_user_func_array('Request::is', (array) $path) ? $active : '';
    }
}
        
?>
