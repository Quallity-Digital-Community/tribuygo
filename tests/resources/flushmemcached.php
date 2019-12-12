<?php
header('Content-Type: application/json'); 
$index =  1;
// Get the items 
// Using Memcached 
$m = new Memcached();
// Add server 
$m->addServer('localhost', 11211);
// Get the data from the array 
//$getAllProduct = $m->get('product_search_result');
// Set index 
//settype($index, 'integer');
// Get the index 
//$getThePRoduct = $getAllProduct[$index];
// Set the resut 
//echo json_encode($getThePRoduct);

$m->flush();