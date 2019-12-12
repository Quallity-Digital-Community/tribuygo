<?php
header('Content-Type: application/json');
// CategoryListLocation_mor.json
// getallproduct_mor.json
// keywords_mor.json 
// ProductSuggession_mor.json
$m = new Memcached();
$m->addServer('localhost', 11211);
//$productTitles = $m->get('product_title');
$allproduct = file_get_contents('backup/Getallproduct.json'); // product_search_result
$allkeyword = file_get_contents('backup/search_key_words.json'); // search_key_words

$product_titles = file_get_contents('backup/product_title.json');



$all_data = json_decode($allproduct, true);
$all_key = json_decode($allkeyword, true);
$product_titles = json_decode($product_titles, true);


$m->set('search_key_words', $all_key);
$m->set('product_title', $product_titles);
 

$cdata = count($all_data);


for($i = 0; $i < $cdata; $i++) {

	$m->set($i, $all_data[$i]);
}


//$m->set('product_search_result', $all_data);


