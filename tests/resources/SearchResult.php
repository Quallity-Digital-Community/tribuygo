<?php
// $searchString = 'Apple MacBook Pro MPXQ2 Laptop - Intel Core i5, 2.3Ghz Dual Core, 13-Inch, 128GB SSD, 8GB, English Keyboard, Mac OS Sierra, Space Gray - International Version';

$searchString = 'tv';

$m = new Memcached();
$m->addServer('localhost', 11211);

$productTitles = $m->get('product_title');
$searchKeys = $m->get('search_key_words');


$keys = $m->getAllKeys();

$productSearchResult = getOnlyProductIndex($m, $keys);


function getOnlyProductIndex(Memcached $m, array $data ):array {

	$val = array_filter($data,"getOnlyProductKey");


	sort($val);

	$len = count($val);

 
	$productSearchResult = [];

	for($i = 0; $i < $len; $i++) {

		$productSearchResult[] = $m->get($i);
		
	}

	return $productSearchResult;

}



$searchString = $searchString;

$i = 0;

function IfProductFound( 
						array $productTitles, 
						string $searchString, 
						array $productSearchResult, 
						array $searchKeys ):array 
{

	$finding = false;

	foreach($productTitles as $key => $value) {

	$found = false;

	// Again value foreach 
	foreach($value as $iKey => $iValue) {
		// Match the string 
		if(strtolower($iValue) === strtolower($searchString)) {

			// Set the variable 
			$found = true;

			// Break the  loop
			break;
		}
	}

	// Check if found is true 
	if($found === true ) {

		// Exchange key value 
		$copyFirstIndex = $productSearchResult[$key][0];

		$productSearchResult[$key][0] = $productSearchResult[$key][$iKey];

		$productSearchResult[$key][$iKey] = $copyFirstIndex;
		
		$finding =  [ 'result' => $productSearchResult[$key], 'index_to_find' => $iKey];
		// Then break the loop 
		break;
	}  

}

if($finding === false ) {

// If nothing found we still need to look if the keyword is matching in the product search array array somewhere 
foreach($searchKeys  as $key => $value ) {

	
	// If search string is greater then value 
	$found = strlen($value) <= strlen($searchString) ? stripos($searchString, urldecode ($value)) : stripos(urldecode($value), $searchString);
	
	// Check if it is false 
	if($found !== false ) {

		$finding = ['result' => $productSearchResult[$key]];

		break;
	}
}

}

// Now we will check everthing inside 


// Still if finding is false then 
if($finding === false ) {

	
}


// Return finding 
return $finding ? $finding : ['status' => 404, 'message' => 'Opps, We are unable to find anything right the moment.', 'searchString' => $searchString];

}


function getOnlyProductKey($var)
{
	$reg = '/^[0-9]{1,}$/';

	return preg_match($reg, $var);
}


echo json_encode(IfProductFound($productTitles, $searchString, $productSearchResult, $searchKeys));