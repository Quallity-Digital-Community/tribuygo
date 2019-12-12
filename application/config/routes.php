<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/*
| -------------------------------------------------------------------------
| URI ROUTING
| -------------------------------------------------------------------------
| This file lets you re-map URI requests to specific controller functions.
|
| Typically there is a one-to-one relationship between a URL string
| and its corresponding controller class/method. The segments in a
| URL normally follow this pattern:
|
|	example.com/class/method/id/
|
| In some instances, however, you may want to remap this relationship
| so that a different class/function is called than the one
| corresponding to the URL.
|
| Please see the user guide for complete details:
|
|	https://codeigniter.com/user_guide/general/routing.html
|
| -------------------------------------------------------------------------
| RESERVED ROUTES
| -------------------------------------------------------------------------
|
| There are three reserved routes:
|
|	$route['default_controller'] = 'welcome';
|
| This route indicates which controller class should be loaded if the
| URI contains no data. In the above example, the "welcome" class
| would be loaded.
|
|	$route['404_override'] = 'errors/page_missing';
|
| This route will tell the Router which controller/method to use if those
| provided in the URL cannot be matched to a valid route.
|
|	$route['translate_uri_dashes'] = FALSE;
|
| This is not exactly a route, but allows you to automatically route
| controller and method names that contain dashes. '-' isn't a valid
| class or method name character, so it requires translation.
| When you set this option to TRUE, it will replace ALL dashes in the
| controller and method URI segments.
|
| Examples:	my-controller/index	-> my_controller/index
|		my-controller/my-method	-> my_controller/my_method
*/

/*
	WEB ROUTE 
*/


$route['default_controller'] = 'CanBeLessPrice/defaut_page';
$route['search'] = 'CanBeLessPrice/index';
$route['404_override'] = '';
$route['translate_uri_dashes'] = FALSE;
$route['api/fetch_all_product'] = 'FetchProductDetails/index';
$route['api/category_list_location'] = 'CategoryListLocation/index';
$route['api/product_sugesstion'] = 'ProductSuggestions/index';
$route['api/product_search_result'] = 'ProductSearchResult/index';
$route['joinus'] = 'CanBeLessPrice/joinus';

// Testing routes
$route['test'] = 'CanBeLessPrice/index';

$route['api/joinus_request'] = 'CanBeLessPrice/joinUsRequest';

// Enquiry request 
$route['api/enquiry_request'] = 'CanBeLessPrice/enquiryRequest';

$route['api/tests'] = 'CanBeLessPrice/test';

// Privacy and Policy 
$route['privacy-and-policy'] = 'CanBeLessPrice/privacyandpolicy';


/*
	ADMINISTRATOR ROUTES 
*/

$route['login'] = 'Administrator/AdminLoginView';
$route['administrator'] = 'Administrator/index';
$route['administrator/keywords'] = 'Administrator/keywords';
$route['administrator/add_keywords'] = 'Administrator/addKeywords';
$route['administrator/list_items/:num'] = 'Administrator/listItemUnderTheKeyWords/$1';

// Add keyword to memcached 
$route['administrator/addkeyword']['post'] = 'Administrator/addKeyWordToMemcached';

// administrator login route 
$route['administrator/login_request']['post'] = 'Administrator/SetAdminSession';

// Logout administrator 
$route['administrator/logout'] = 'Administrator/LogoutAdmin';

// Privacy and policy
 




/*
	MOBILE ROUTES 
*/

$route['api/mobile/getproducts'] = 'MobileProducts/index';

// Product location for jquery need json object to show the product in input file 
$route['api/mobile/product_location']['post'] = 'MobileProducts/productLocations';

// While user type user suggessiong need to showto product list 

$route['api/mobile/product_sugesstion']['post'] = 'MobileProducts/productSugesstion';

// Mobile join us and enquiry 

$route['api/mobile/request_enquiry']['post'] = 'MobileProducts/enquiryRequest';

// Advertising 
$route['api/mobile/addvertising'] = 'MobileProducts/addImage';


