<?php 
//echo phpinfo();
require ('../../../../vendor/autoload.php');
  $keyword = 'dell xps 15';

  // count keyworld 
  $countKeyword = str_word_count($keyword);

    // Restore error level
    //libxml_use_internal_errors(false);
  $doc = new DOMDocument();




    $internalErrors = libxml_use_internal_errors(true);

    $search_key = urlencode($keyword);

/*

  $data = [




        [
            
            'url' => 'https://www.amazon.ae/s?k='.$search_key.'&ref=nb_sb_noss',
            'attributes' => [
                                'title' => '//span[@class ="a-size-medium a-color-base a-text-normal"]',
                                'image' => '//div[@class="a-section aok-relative s-image-fixed-height"]/img/@src',
                                'price' => "//span[@class='a-price-whole']",
                                'description'=> "//a[@class='a-link-normal a-text-normal']/@href",
                                'review' => "//span[@class='rating-stars']",
                                'shipping' => "//div[@class='a-row']//span[@dir='auto']",
                                'original_price' => "//span[@class='a-price-whole']",
                                'discount_price' => "//span[@class='a-color-base']",
                                'ratings' => "//span[@class='rating-stars']//i[@class ='star-rating-svg']//i/@style",
                                'stock' => "//span[@class='a-color-price']",
                                'offer' => "//a[@class='a-link-normal']",
                                                                                                                    
                            ]
        ],
        
        [
            
            'url' => 'https://www.ebay.com/sch/i.html?_from=R40&_trksid=m570.l1313&_nkw='.$search_key.'&_sacat=0',
            'attributes' => [
                                'title' => '//h3[@class ="s-item__title"]',
                                'image' => '//img[@class="s-item__image-img"]/@src',
                                'price' => "//div[@class='s-item__detail s-item__detail--primary']//span[@class='s-item__price']",
                                'description'=> "//div[@class='s-item__image']//a/@href",
                                'review' => "//span[@class='rating-stars']",
                                'shipping' => "//span[@class='s-item__shipping s-item__logisticsCost']",
                                'original_price' => "//span[@class='a-price-whole']",
                                'discount_price' => "//span[@class='a-color-base']",
                                'ratings' => "//span[@class='rating-stars']//i[@class ='star-rating-svg']//i/@style",
                                'stock' => "//span[@class='s-item__time-end']",
                                'offer' => "//a[@class='a-link-normal']",
                                                                                                                    
                            ]
        ],
        
                [
            
            'url' => 'https://www.virginmegastore.ae/en/search/?text='.$search_key,
            'attributes' => [
                                'title' => '//a[@class ="name"]',
                                'image' => '//img[@itemprop="image"]/@src',
                                'price' => "//span[@class='price']",
                                'description'=> "//a[@class='thumb']/@href",
                                'review' => "//div[@class='tf-based']//div[@class='tf-count']",
                                'shipping' => "//span[@class='s-item__shipping s-item__logisticsCost']",
                                'original_price' => "//span[@class='a-price-whole']",
                                'discount_price' => "//span[@class='a-color-base']",
                                'ratings' => "//span[@class='tf-stars-svg']/@style",
                                'stock' => "//span[@class='s-item__time-end']",
                                'offer' => "//a[@class='a-link-normal']",
                                                                                                                    
                            ]
        ],





[
            'url' => 'https://www.erosdigitalhome.ae/catalogsearch/result/?q='.$search_key,
            'attributes' => [
                                'title' => '//a[@class ="product-item-link"]',
                                'image' => '//img[@class="product-image-photo"]//@src',
                                'price' => "//span[@class='price']",
                                'description'=> "//a[@class='product-item-link']/@href",
                                 'review' => "//span[@class='rating-stars']",
                                'shipping' => "//div[@class='free-shipping fs-ab-black']",
                                'original_price' => "//p[@class='comp-productcard__price']",
                                'discount_price' => "//span[@class='onoffer']",
                                'ratings' => "//span[@class='onoffer']",
                            ]
        ],
[
            'url' => 'https://www.axiomtelecom.com/home/search?q='.$search_key,
            'attributes' => [
                                'title' => '//span[@class ="variant-title"]/a',
                                'image' => "//div[@id='content-slot']//div[@class='variant-image']//img/@src",
                                'price' => "//span[@class='variant-final-price']",
                                'description'=> "//span[@class='variant-title']/a/@href",
                                'review' => "//span[@class='rating-stars']",
                                'shipping' => "//div[@class='free-shipping fs-ab-black']",
                                'original_price' => "//span[@class='variant-list-price']",
                                'discount_price' => "//span[@class='variant-list-price']",
                                'ratings' => "//span[@class='onoffer']",
                            ]
        ],
            [
            
            'url' => 'https://www.newegg.com/global/ae-en/p/pl?d='.$search_key.'&ignorear=0&N=-1&isNodeId=1&Submit=ENE&DEPA=0&Order=BESTMATCH',
            'attributes' => [
                                'title' => '//a[@class="item-title"]',
                                'image' => '//a[@class="item-img"]/img/@src',
                                'price' => '//li[@class="price-current"]',
                                'description'=> '//a[@class="item-img"]/@href',
                                'review' => "//span[@class='rating-stars']",
                                'shipping' => "//div[@class='a-row']//span[@dir='auto']",
                                'original_price' => "//span[@class='a-price-whole']",
                                'discount_price' => "//span[@class='a-color-base']",
                                'ratings' => "//span[@class='rating-stars']//i[@class ='star-rating-svg']//i/@style",
                                'stock' => "//span[@class='a-color-price']",
                                'offer' => "//a[@class='a-link-normal']",
                                                                                                                    
                            ]
        ],

        

        [
            
            'url' => 'https://www.alibaba.com/products/'.$search_key.'.html',
            'attributes' => [
                                'title' => "//h2[@class='title two-line']//a/@title",
                                'image' => "//div[@class='offer-image-box']//img/@src",
                                'price' => "//div[@class='price']",
                                'description'=> "//h2[@class='title two-line']//a/@href",
                                'review' => "//span[@class='rating-stars']",
                                'shipping' => "//div[@class='a-row']//span[@dir='auto']",
                                'original_price' => "//span[@class='a-price-whole']",
                                'discount_price' => "//span[@class='a-color-base']",
                                'ratings' => "//span[@class='rating-stars']//i[@class ='star-rating-svg']//i/@style",
                                'stock' => "//span[@class='a-color-price']",
                                'offer' => "//a[@class='a-link-normal']",
                                                                                                                    
                            ]
        ],


     


[
            'url' => 'https://uae.microless.com/search/?query='.$search_key,
            'attributes' => [
                                'title' => '//div[@class ="product-title"]/a',
                                'image' => "//*[contains(concat(' ', normalize-space(@class), ' '), 'product-image')]//a//img/@data-src",
                                //$nodes = $xpath->query("//*[contains(concat(' ', normalize-space(@class), ' '), 'product-image')]//a//img/@data-src")->item(0)->nodeValue;
                                'price' => "//span[@class='amount']",
                                'description'=> "//div[@class='product-title']/a/@href",
                                'review' => "//span[@class='rating-stars']",
                                'shipping' => "//div[@class='free-shipping']",
                                'original_price' => "//span[@class='price-old']",
                                'discount_price' => "//div[@class='product-discount-badge']",
                                'ratings' => "//span[@class='onoffer']",
                            ]
        ],
[
            'url' => 'https://www.amazon.com/s?k='.$search_key.'&ref=nb_sb_noss_2',
            'attributes' => [
                                'title' => '//span[@class ="a-size-medium a-color-base a-text-normal"]',
                                'image' => '//img[@class="s-image"]/@src',
                                'price' => "//span[@class='a-color-base']",
                                'description'=> "//a[@class='a-link-normal a-text-normal']/@href",
                                //need to add host name fot the description url
                                'review' => "//span[@class='starRating__count']",
                                'shipping' => "//span[@class='a-size-small a-color-secondary']",
                               'original_price' => "//span[@class='a-offscreen']",
                                'discount_price' => "//div[@class='product-discount-badge']",
                                'ratings' => "//span[@class='a-icon-alt']",
                            ]
        ],
           [
            'url' => 'https://www.jumbo.ae/home/search?q='.$search_key.'/s/?as=1',
            'attributes' => [
                                'title' => '//span[@class = "variant-title"]/a',
                                'image' => "//div[@id='content-slot']//div[@class='variant-image']//img/@src",
                                'price' => "//div[@id='content-slot']//span[@class='variant-final-price']",
                                'description'=> "//span[@class='variant-title']/a/@href",
                                //need to add host name fot the description url
                                'review' => "//span[@class='rating-stars']",
                                 'shipping' => "//div[@class='free-shipping fs-ab-black']",
                                 'original_price' => "//span[@class='variant-list-price']",
                                'discount_price' => "//span[@class='variant-list-price']",
                                'ratings' => "//span[@class='tf-stars-svg']/@style",


            ]
        ],
        
       
        
];

*/


// https://www.jumbo.ae/home/search?q=dell+xps

$data = [
    [
            'url' => 'https://www.jumbo.ae/home/search?q='.$search_key,
            'attributes' => [
                                'title' => '//ul[@id="search-result-items"]//span[@class = "variant-title"]/a',
                                'image' => '//ul[@id="search-result-items"]//div[@class="variant-image"]//img/@src',
                                'price' => '//ul[@id="search-result-items"]//span[@class="variant-final-price"]',
                                'description'=> '//ul[@id="search-result-items"]//span[@class="variant-title"]/a/@href',
                                //need to add host name fot the description url
                                'review' => '//ul[@id="search-result-items"]//span[@class="rating-stars"]',
                                 'shipping' => '//ul[@id="search-result-items"]//div[@class="free-shipping fs-ab-black"]',
                                 'original_price' => '//ul[@id="search-result-items"]//span[@class="variant-list-price"]',
                                'discount_price' => '//ul[@id="search-result-items"]//span[@class="variant-list-price"]',
                                'ratings' => '//ul[@id="search-result-items"]//span[@class="tf-stars-svg"]/@style'

                            ],


            ]

];



    $output = [];

    $siva = [];


    foreach ($data as $item) {
        $content = file_get_contents($item['url']);

        $doc->loadHTML($content);

        $xpath = new DomXPath($doc);

        // get grouped
        $groupedItems = [];

        // James
        $all = [];


        foreach ($item['attributes'] as $key => $value) {

            if ($xpath->query($value) === false) {

                continue;
                
            } else {

                $Inner = [];

                for ($j = 0; $j < $xpath->query($value)->length; $j++) {
                   
                    // We need some filed is required such as title, price , image must matched 

                    // if($j === 15) { break; }
                    // Getting value 
                    $valudNodes = preg_replace('/\s\s+/', ' ', trim($xpath->query($value)->item($j)->nodeValue, "\t\n\r\0\x0B"));;

                    if($key === 'title' || $key === 'price' || $key === 'image') {

                        // Check item containe something 
                        if($valudNodes === '') {

                            continue;
                        }
                    }


                    /*
                    // It must be title 
                    if($key === 'title') {

                        if($countKeyword < 3) {

                        if(!strpos(strtolower($valudNodes), strtolower($keyword))) {

                            continue;

                         }
                        
                        }
                        
                        // Check that 

                    }
                    */

                    $Inner[] = $valudNodes;
                }

                $all[$key] = $Inner;


                $val = $xpath->query($value)->item(0)->nodeValue ?? '';

                $groupedItems[$key] = preg_replace('/\s\s+/', ' ', trim($val, "\t\n\r\0\x0B"));
            }
        }



        $parseurl = parse_url($item['url'])['host'];

        $siva[$parseurl] = $all;

        $output ["$parseurl"] = $groupedItems;
    }

    // Get data 
    $getData = [];


    // Loop data throught the value 
    foreach ($siva as $key => $value) {
        $getBlock = [];



        $howMany = count($value[key($value)]);


        
        for ($i = 0; $i < $howMany; $i++) {
            $a = [];


            foreach ($value as $k => $v) {
                $a[$k] = isset($value[$k][$i]) ? $value[$k][$i] : '';
            }

            $getBlock[] = $a;
        }
            
        $getData[$key] = $getBlock;
    }



    // Get max record 
    $getMaxRecord = GetMaxRecord($getData);

    // Defining variable 
    $b = [];

    // Defining 
    $c = [];

    

    // Loop through each data 
    for ($i = 0; $i < $getMaxRecord; $i++) {
      foreach ($getData as $key => $value) {
        if (isset($getData[$key][$i])) {
            $b[$key] = $getData[$key][$i];
            $b[$key]['website'] = $key;
            $b[$key]['keyword'] = $keyword;


        } else {
            unset($b[$key]);
        }
    }

      $c[] = $b;
    }

// Make array in single webite 

$total = count($c);

// Only single dimensional array 
$singleArray = [];



for($j = 0; $j < $total; $j++) {

    // Loop each 
    foreach($c[$j] as $key => $value) {

        // Get value 
        $singleArray[] = $value;
    }
}



echo "<pre>";
print_r($singleArray);
echo "</pre>";

exit();


    $productTitle = $siva['www.amazon.ae']['title'] ?? '';

    // As we know that noon value is not comming thefore let do 
    // Get the json data from noon too

    $insert = NoonGetSearchInJson($keyword);


    // As explaind in Node No:1 Comment
    $insert = array_map('putArray', $insert);

    // Number of website 
    $numbeOfweb = count($data);

    // Original 
    $original = ''; // Will containe all data comming from previous 

    /* $singleArray Single dimensional array search results */
    $singleArray = AddDataMiddleOfArray($numbeOfweb, $singleArray, $insert);

    /* Create mongodb instances */
    $client = new MongoDB\Client("mongodb://localhost:27017");

    // Add the product 
    $collection = $client->tribuygo->products;

    // Insert many 
    $collection->insertMany($singleArray);

    $collection->createIndex(["title" => "text"]);



    // Using Memcached 
        $m = new Memcached();

        // Add server 
    $m->addServer('localhost', 11211);


    // Get the product search title 
    $memSearchedKeyword = $m->get('search_key_words');
    //$memProductTitles = $m->get('product_title');
    // get all memcached keys 
    $keys = $m->getAllKeys();
    $i = 0;

    if(is_array($memSearchedKeyword)) {

      if(!in_array($search_key, $memSearchedKeyword)) {

        // Push the information 
        array_push($memSearchedKeyword, $search_key);
        //array_push($memProductTitles, $productTitle);

        

        // Get only 
        //$val = array_filter($keys,"getOnlyProductKey");
        
        // Sort the  array 
        //sort($val);
        //$productSearchResult = $c;
        // count the value 
        //$i = count($val);

      
      } else {


        // Find the array index of title 
        $i = array_search($search_key, $memSearchedKeyword);

        // if index found 
        if($i !== false ){

         
          //$memProductTitles[$i] = $productTitle;
         // $productSearchResult  = $c;
        }

      }

    } else {

      // Initialize the array 
      $memSearchedKeyword = [$search_key];
      //$memProductTitles = [$productTitle];
      //$productSearchResult = $c;


    }



    // Check the product title 
    $m->set('search_key_words', $memSearchedKeyword );
    //$m->set('product_title', $memProductTitles);

    // Get the all product key 

    // Loop through the each 
    // Count the result 
    /*
    $countResult = count($singleArray);


    // Coun the already have data 
    $products = getOnlyProductAsArray($keys, $m);


    // coun the product 
    if(is_array($products) && count($products) > 0) {

        // How many proudct 
        $coundOldProudct = count($products);

        // count new product that we have got 
        $countNewProduct = count($singleArray);

        // Loop through 
        $totalCount = $countNewProduct + $countNewProduct;

        // Loop through and add the product 
        for($j = 0; $j < $countResult; $j++) {

            $m->set($coundOldProudct + $j, $singleArray[$j]);
        }

    } else {

        // loop each data 
         for($j = 0; $j< $countResult; $j++) {

            $m->set($j, $singleArray[$j]);
    }

    }
    
    */

    
    

    // Load view with all message 
  
    
    
    $message = 
      [
        'status' => 'success', 'message' => 'Product added sucessfull to you database'
      ];


 function GetMaxRecord($records)  {
      return max(array_map(function ($items) {
          return count($items) ;
      }, $records));
  }

function getOnlyProductKey($var)
{
    $reg = '/^[0-9]{1,}$/';

    return preg_match($reg, $var);
}


function getOnlyProductAsArray(array $keys, Memcached $m):array {

$val = array_filter($keys,"getOnlyProductKey");

//sort($val);

$len = count($val);

//echo $len;
// get all product 
$getallProdcut = [];

for($i = 0; $i <= $len; $i++) {

    if($m->get($i) !== false ) {

        $getallProdcut[] = $m->get($i);
    }
    
}

return $getallProdcut;

}

function NoonGetSearchInJson(string $search ) {

// Disable error 
libxml_use_internal_errors(true);

// Search String 

$search = urlencode(trimSearchKeyWord($search));

// Noon Url;

$url = "https://www.noon.com/uae-en/search?q=$search";

// Dom Document 
@$doc = new DOMDocument();

// Get the file content 
$content = file_get_contents($url);

// Load HTML
$doc->loadHTML($content);

// Dom xpath 
$xpath = new DOMXPath($doc);

// Loop each content 
foreach($xpath->query('//body//script[@id="__NEXT_DATA__"]') as $queryResult) {
    // Append content to html qury 
    $getString = $queryResult->nodeValue;
    

}

// Decode dat in json 
$dataInArray = json_decode($getString, true);

// Check the hits 
$hits = $dataInArray['props']['pageProps']['catalog']['hits'];

// New array 
$newArray = [];

// Loopo each item 
foreach($hits as $item) {

    $brand = $item['brand'] ?? '';

    $item['title'] = $brand.' '.$item['name'];
    // Some keys need to matched with the existing 
    $item['image_key'] = "https://k.nooncdn.com/t_desktop-thumbnail-v2/".$item['image_key'].'.jpg';
    $item['image'] = $item['image_key'];
    // Url 
    $item['sale_price'] = "{$item['sale_price']}";
    $item['price'] = "{$item['price']}";
    $item['url'] = "https://www.noon.com/uae-en/".$item['url'].'/'.$item['sku'].'/p?o='.$item['offer_code'];
    $item['shipping'] = '';
    $item['discount_price'] = "{$item['sale_price']}";
    $item['original_price'] = "{$item['price']}";
    $item['description'] = $item['url'];
    $item['website'] = 'www.noon.com';
    $item['ratings'] = '';
    $item['review'] = '';
    $item['keyword'] = $search;


    // Get new array 
    $newArray[] = $item;
}

return $newArray;
}



function trimSearchKeyWord(string $string  ): string   {

    $string = trim($string);
    $string = rtrim($string);
    $string = preg_replace('/\s\s+/', ' ', $string);
    $string = strtolower($string);

    // Return search string 
    return $string;
}


function AddDataMiddleOfArray(string $numberOfWebsite, array $where, array $what):array {

    // count what 
    $whatCount = count($what);

    for($i = 0; $i < $whatCount; $i++) {

        array_splice( $where, $i * $numberOfWebsite,  0, $what[$i] ); // splice in at position 3
    }

    return $where;
}

function putArray($item) {

    return array ($item);
}




echo json_encode($message);