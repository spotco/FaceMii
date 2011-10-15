<?
  // Remember to copy files from the SDK's src/ directory to a
  // directory in your application on the server, such as php-sdk/
  header('Content-type: text/javascript');
  if (isset($_GET['callback1']) && isset($_GET['callback2'])) { //getting posts
	  require_once('facebook.php');

	  $config = array(
		'appId' => '233754760011884',
		'secret' => '4c1ec852fda8248c51f1ebd5e9ce59aa',
		'scope' => 'read_stream'
	  );

	  $facebook = new Facebook($config);
	  $signed_request = $facebook->getSignedRequest();
	  $user_id = $facebook->getUser();
	  
	  if ($user_id) {
			try {
				//dealing with most daya
				$statuses = $facebook->api('/me/home');
				$callback1 = filter_var($_GET['callback1'], FILTER_SANITIZE_STRING);
				$callback2 = filter_var($_GET['callback2'], FILTER_SANITIZE_STRING);
				echo $callback1 . '('. json_encode($statuses).');';
				//dealing with pics and genders
				$pictureData = $statuses['data']; 												//the posts
				foreach($pictureData as $post) {
					$personID = $post['from']['id'];
					$callback2 = filter_var($_GET['callback2'], FILTER_SANITIZE_STRING);					//id of poster
					$sample = $facebook->api('/' . $personID);	//request for picture
					if( isset($sample['gender']) && !empty($sample['gender'])) {
						echo $callback2 . '('. json_encode($sample).');';
					}
				}
				echo 'render();';
			} catch(FacebookApiException $e) {
				// If the user is logged out, you can have a 
				// user ID even though the access token is invalid.
				// In this case, we'll get an exception, so we'll
				// just ask the user to login again here.
				$login_url = $facebook->getLoginUrl();
				var_dump($e);
				echo 'error(' . json_encode($login_url) . ');';
				error_log($e->getType());
				error_log($e->getMessage());
			}   
		} else {
		  // No user, call login function
		  $login_url = $facebook->getLoginUrl();
		  echo 'login(' . json_encode($login_url) . ');';
		}
	}else { //posting
		//write last
	
	
	
	}
?>