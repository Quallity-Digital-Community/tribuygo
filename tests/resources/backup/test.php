<?php


$getcontent = file_get_contents('../backup/search_key_words.json');


$decode = json_decode($getcontent, true);

$keyworlds = array_map('putArray', $decode);

function putArray($item) {

    return trimSearchKeyWord ($item);
}


function trimSearchKeyWord(string $string  ): string   {

    $string = trim($string);
    $string = rtrim($string);
    $string = preg_replace('/\s\s+/', ' ', $string);
    $string = preg_replace('/\t+/', '', $string);
    $string = urldecode(strtolower($string));

    // Return search string 
    return $string;
}

echo json_encode($keyworlds);