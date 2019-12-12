<?php 

if (php_sapi_name() == "cli") {
    // In cli-mode
    define('HOST_NAME', 'localhost');
	define ('MEMCACHED_PORT', 11211);
} else {
    // Not in cli-mode
    define('HOST_NAME', $_SERVER['HOST_NAME']);
	define ('MEMCACHED_PORT', 11211);
}

