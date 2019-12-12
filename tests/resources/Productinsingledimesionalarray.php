<?php
$m = new Memcached();
$m->addServer('localhost', 11211);
$productTitles = $m->get('product_title');
$searchKeys = $m->get('search_key_words');
// Get all product in one 
$productInarray = [];
$keys = $m->getAllKeys();
$productSearchResult = GetOnlyProductFromMemcached($m, $keys);



	// We need to find in whole product 
	// Get indside of each product title and find if there is any word 
	foreach($productSearchResult as $block) {

		// If blok is !== false 
		if($block !== false ) {

			foreach($block as $key => $value) {


			foreach($value as $iKey => $iValue) {

				$iValue['website'] = $iKey;
				//$productSearchResult[$key][$iKey]['website'] = 'Hello';
$productInarray[] = $iValue;
				//echo $iKey;

			}

		}
		

			
		}

	}


echo "<pre>";
print_R($productInarray);
echo "</pre>";


function getOnlyProductKey($var){
    $reg = '/^[0-9]{1,}$/';

    return preg_match($reg, $var);
}
function GetOnlyProductFromMemcached(Memcached $m, array $data) :array {

		// Filter array 
		$val = array_filter($data, 'getOnlyProductKey');

		// Sort 
		sort($val);

		// Array length 
		$len = count($val);

		// Product search result
		$productSearchResult = [];

		for($i = 0; $i <= $len; $i++) {

		$productSearchResult[] = $m->get($i);

		}

		// Return the data 
		return $productSearchResult;
}



