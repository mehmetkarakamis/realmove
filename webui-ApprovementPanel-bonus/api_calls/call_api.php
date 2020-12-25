<?php
session_start();

if (!isset($_SESSION['token']) || !isset($_SESSION['userId'])) {
    echo 'Bu sayfaya erişim yetkiniz yoktur! Lütfen önce giriş yapınız!<br>';
    echo '<a href="../login.php">Giriş yapmak için tıklayınız.</a>';
    die();
}

function callAPI($token, $method, $url, $data)
{
    $curl = curl_init();
    
    switch ($method) {
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
        case "PATCH":
            curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "PATCH");
            if($data)
                curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
            break;
        case "DELETE":
            curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "DELETE");
            if($data)
                curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
            break;
        default:
            if ($data)
                $url = sprintf("%s?%s", $url, http_build_query($data));
    }
    // OPTIONS:
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_HTTPHEADER, array(
        'Authorization: Bearer ' . $token,
        'Content-Type: application/json',
    ));
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    // EXECUTE:
    $result = curl_exec($curl);
    if (!$result) {
        die("Connection Failure");
    }
    curl_close($curl);
    return $result;
}

if($_GET["operation"] == "getAllAdverts") {
    
    if(isset($_SESSION['token']))
    {
        $token = $_SESSION['token'];
        $make_call = callAPI($token, 'GET', 'http://18.193.158.75:8011/adverts-ws/api/advert/newAdverts', null);
        $response = json_decode($make_call, true);
    
        echo json_encode($response);
    }else {
        $result = array(
            'error' => 'An error occurred while fetching data. Invalid token.'
        );

        echo json_encode($result);
    }
    
}

if($_GET["operation"] == "approveOrRejectAdvert") {
    
    if(isset($_SESSION['token']) && isset($_POST['advertId']))
    {
        $advertId = htmlspecialchars($_POST['advertId']);
        $operation = htmlspecialchars($_POST['operation']);
        if($operation == "approve") {

            $data = array(
                "advertId" => $advertId,
            );
            $token = $_SESSION['token'];
            $make_call = callAPI($token, 'GET', 'http://18.193.158.75:8011/adverts-ws/api/advert/newAdverts/approve', $data);
            $response = json_decode($make_call, true);
        
            echo json_encode($response);
        }else {
            
            $token = $_SESSION['token'];
            $make_call = callAPI($token, 'GET', 'http://18.193.158.75:8011/adverts-ws/api/advert/newAdverts/reject?advertId='.$advertId, null);
            $response = json_decode($make_call, true);
        
            echo json_encode($response);
        }

    }else {
        $result = array(
            'error' => 'An error occurred while fetching data. Invalid token or advert ID.'
        );

        echo json_encode($result);
    }
    
}