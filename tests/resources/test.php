<?php

//$product = file_get_contents('getallproduct.json');

//$dec = json_decode($product, true);

//echo "<pre>";
//print_R($dec);
//echo "</pre>";

$a['price'] = 80;

$p = "{$a['price']}";


echo gettype($p);
echo gettype($a['price']);

exit();
$a = [
		
		['name' => 'a'],
		['name' => 'b'],
		['name' => 'c'],
		['name' => 'd'],
		['name' => 'e'],
		['name' => 'f'],

	];

$b = array_splice($a, 2, 2);

//echo "<pre>";
//print_R($b);
//echo "</pre>";

$str1 = 'laptop';
$str2 = 'laptops';

if(stripos($str1, $str2) !== false) {

	echo 'Both are same';
}