<?php
// kvstore API url
$url = 'http://18.193.158.75:8011/adverts-ws/api/advert/all';
// Collection object
$data = [
  'collection' => 'RapidAPI'
];
// Initializes a new cURL session
$curl = curl_init($url);
// Set the CURLOPT_RETURNTRANSFER option to true
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
// Set the CURLOPT_POST option to true for POST request
//curl_setopt($curl, CURLOPT_POST, true);
// Set the request data as JSON using json_encode function
//curl_setopt($curl, CURLOPT_POSTFIELDS,  json_encode($data));
// Set custom headers for RapidAPI Auth and Content-Type header
curl_setopt($curl, CURLOPT_HTTPHEADER, [
  'Content-Type: application/json',
  'Authorization: Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI5NTQyNDIwNi1kZmIwLTQwYjgtYTVhMi04YzI3MmQ1ZGVlOTgiLCJleHAiOjE2MDg3NDk2MTB9.JpI3Bn5ie4Skud7JDAEakdhF33csMsBLEKT8IOYyZln4ajs7duAphTy5b-YDme3blYg071q7BQKdkAZhFU_IpA',
]);
// Execute cURL request with all previous settings
$response = curl_exec($curl);
// Close cURL session
curl_close($curl);
echo $response . PHP_EOL;

