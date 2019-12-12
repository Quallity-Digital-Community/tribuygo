<?php
// $searchString = 'Apple MacBook Pro MPXQ2 Laptop - Intel Core i5, 2.3Ghz Dual Core, 13-Inch, 128GB SSD, 8GB, English Keyboard, Mac OS Sierra, Space Gray - International Version';

$searchString = 'dryer';

$m = new Memcached();
$m->addServer('localhost', 11211);
$productTitles = $m->get('product_title');
$searchKeys = $m->get('search_key_words');
$productSearchResult = $m->get('product_search_result');
//$m->flush();
//echo json_encode($productTitles);
//echo json_encode($searchKeys);
//array_push($productSearchResult, ['fuck you']);

//echo json_encode($productSearchResult);

$searchString = $searchString;

$i = 0;

function IfProductFound( 
						array $productTitles, 
						string $searchString, 
						array $productSearchResult, 
						array $searchKeys ):array {

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


// Still if finding is false 
if($finding === false ) {

	// We need to find in whole product 
	// Get indside of each product title and find if there is any word 
	foreach($productSearchResult as $block) {

		foreach($block as $key => $value) {

			foreach($value as $iKey => $iValue) {

				$productSearchResult[$key][$iKey]['website'] = $iKey;

				//$value[$iKey]['website'] = $iKey;
			}

			
		}
	}

}

echo "<pre>";

print_R($productSearchResult);
echo "</pre>";


// Return finding 
return $finding ? $finding : ['status' => 404, 'message' => 'Opps, We are unable to find anything right the moment.', 'searchString' => $searchString];

}

echo json_encode(IfProductFound($productTitles, $searchString, $productSearchResult, $searchKeys));