<?php
session_start();

function callAPI($method, $url, $data){
    $curl = curl_init();
    switch ($method){
       case "POST":
          curl_setopt($curl, CURLOPT_POST, 1);
          if ($data)
             curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
          break;
       case "PUT":
          curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "PUT");
          if ($data)
             curl_setopt($curl, CURLOPT_POSTFIELDS, $data);			 					
          break;
       default:
          if ($data)
             $url = sprintf("%s?%s", $url, http_build_query($data));
    }
    // OPTIONS:
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_HTTPHEADER, array(
       'Content-Type: application/json',
    ));
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    // EXECUTE:
    $result = curl_exec($curl);
    if(!$result){die("Connection Failure");}
    curl_close($curl);
    return $result;
 }

if($_GET["process"] == "true") {
    $data_array =  array(
        "email"        => htmlspecialchars($_POST["email"]),
        "password"     => htmlspecialchars($_POST["password"]),
    );
    
    if($data_array["email"] == "admin@realmove.tk") {
      $make_call = callAPI('POST', 'http://18.193.158.75:8011/users-ws/api/user/login', json_encode($data_array));
      $response = json_decode($make_call, true);
      
      if(!isset($response['error'])) {
          $_SESSION["token"] = $response['token'];
          $_SESSION["userId"] = $response['userId'];
      }
    }else {
      $response = array(
         "error" => "This user is not administrator!"
      );
    }

    echo json_encode($response);

    //$errors   = $response['response']['errors'];
    //$data     = $response['response']['data'][0];
    
    //$result[0] = $response;
    //$result[1] = $errors;
    //$result[2] = $data;
    
    //return $result;
}
