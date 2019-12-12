<?php

// Mr Eyad said Sigular 


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

function trimSearchKeyWord(string $string  ): string   {

	$string = trim($string);
	$string = rtrim($string);
	$string = preg_replace('/\s\s+/', ' ', $string);
	$string = strtolower($string);

	// Return search string 
	return $string;
}


function SingleDimensionalArrayProduct( array $productSearchResult ) : array {

	// Get indside of each product title and find if there is any word 
	foreach($productSearchResult as $block)
	{		

	// If blok is !== false 
	if($block !== false ) {

		foreach($block as $key => $value) {


		foreach($value as $iKey => $iValue) {

			$iValue['website'] = $iKey;
			//$productSearchResult[$key][$iKey]['website'] = 'Hello';

	$productInarray[] = $iValue;
	}

	}
	}

	
	}

	return $productInarray;

}


function SearchProduct(string $searchString, array $productInarray,  int $page) :array {

    
    $countData = count($productInarray);

    $stringToSearch = trimSearchKeyWord($searchString);

    $searchResult = [];
    


    for($i = 0; $i < $countData; $i++) {

    // Check string post if there is data 
    if(stripos($productInarray[$i]['title'], $stringToSearch) !== false) {

        $searchResult[] = $productInarray[$i];
    }
}


// Make the number of page 
$perpage = 20;

// Number of result 
$numberOfResult = count($searchResult);

// Number of pages 
$numberOfPages = ceil($numberOfResult / $perpage);

// Page number 
$page = $page - 1;

$whichpage = $page + 1;



$skipfrom = $page * $perpage;




$message = [
            'status' => 404 , 
            'message' => 'Sorry, We are unable to find anything at the moment.',
            'search' => $searchString
        ];


return count($searchResult) > 0 ? 
                            [
                                'result' =>array_splice($searchResult, $skipfrom , $perpage),
                                'perpage' => $perpage,
                                'numberOfPages' => $numberOfPages,
                                'numberOfResult' => $numberOfResult,
                                'page' => $whichpage
                            ] : 
                            ['result' => $message];


}




$m = new Memcached();
$m->addServer('localhost', 11211);
// Get all product in one 
$productInarray = [];
$keys = $m->getAllKeys();

$searchString = 'washing machine';

$productSearchResult = GetOnlyProductFromMemcached($m, $keys);
$productInarray = SingleDimensionalArrayProduct($productSearchResult);


// Get the data 
$searchResult = SearchProduct($searchString, $productInarray, 2);

echo json_encode($searchResult);