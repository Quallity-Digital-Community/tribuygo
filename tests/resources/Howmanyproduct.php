<?php
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




$m = new Memcached();
$m->addServer('localhost', 11211);
$howMany = '';
// Get all keys 
$keys = $m->getAllKeys();



$result = GetOnlyProductFromMemcached($m, $keys);



?>

<?php for($i = 0; $i < count($result); $i++) :?>

<?php if($result[$i] !== false) :?>

<?php foreach($result[$i] as $key => $value) :?>

<?php $howMany += count($value) ;?>

<?php endforeach; ?>

<?php endif;?>





<?php
	
	
?>



<?php endfor; ?>

<?php echo $howMany;?>



