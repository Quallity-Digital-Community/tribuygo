<?php
require ('vendor/autoload.php');
$client = new MongoDB\Client("mongodb://localhost:27017");
echo "<pre>";
var_dump($client);
echo "</pre>";