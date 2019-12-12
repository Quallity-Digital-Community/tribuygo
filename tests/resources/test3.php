<?php

//$product = file_get_contents('getallproduct.json');

//$dec = json_decode($product, true);

//echo "<pre>";
//print_R($dec);
//echo "</pre>";




function GetAEDToUSD( string $aedPrice):string {

	// Set money to local 
	setlocale(LC_MONETARY,"en_US.UTF-8");

	// USD Conversation 
	$usdConversion = 3.67250;

	// Remove anthing except number 
	$aedPrice = preg_replace('/[^0-9.]/', '', $aedPrice);

	// USD PRice 
	$usdPrice = $aedPrice / $usdConversion;

	 // Then make it number formate 
	 $usdPrice  = money_format("%.2n", $usdPrice);

	 // Return USD Price
	 return $usdPrice.' USD';

}

// AED Price
$aedPrice = '11,729.';
echo GetAEDToUSD($aedPrice);


