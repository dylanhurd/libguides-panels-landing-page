<?php
header('Content-Type: application/json');

$auth = authenticate();
$headers = array(
    "Authorization: Bearer " . $auth,
    "Host: lgapi-us.libapps.com"
  );
$curl = curl_init('https://lgapi-us.libapps.com/1.2/guides?expand=subjects&sort_by=name&status=1');
curl_setopt($curl, CURLOPT_RETURNTRANSFER, TRUE);
curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
curl_setopt($curl, CURLOPT_FRESH_CONNECT, TRUE);
$response = curl_exec($curl);
$err = curl_error($curl);
curl_close($curl);
if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response;
}

function authenticate(){
		$post = [
    		"client_id" => "", // Your LibApps API Client ID
    		"client_secret" => "", // Your LibApps API Client Secret
    		"grant_type"   => "client_credentials",
		];
		$curl = curl_init('https://lgapi-us.libapps.com/1.2/oauth/token');
		curl_setopt($curl, CURLOPT_POST, true);
		curl_setopt($curl, CURLOPT_POSTFIELDS, $post);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, TRUE);
		$response = curl_exec($curl);
		$decoded = json_decode($response,true);
		$err = curl_error($curl);
		curl_close($curl);
		if ($err) {
  			echo "cURL Error #:" . $err;
  			die;
		} else {
  			return $decoded["access_token"];
		}
	}
