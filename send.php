<!doctype html>
<html>
<head>
<meta charset="UTF-8">
<!-- Import various packages -->
<div>
<script src="https://kit.fontawesome.com/a076d05399.js"></script>		
</div>
<!-- Bootstrap 4 formatting -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
<link rel="stylesheet" type="text/css" href="template.css" />
<link rel="stylesheet" type="text/css" href="footer.css" /> 
<link rel="stylesheet" type="text/css" href="about.css" />
<link href="https://fonts.googleapis.com/css2?family=Open+Sans&family=Roboto&display=swap" rel="stylesheet">
</div>  
<!-- Bootstrap 4 formatting -->
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<!-- meta about the website -->
<title>Contact Us Email Form</title>
<link rel="icon" href="biglogo.svg" type="image/svg" sizes="16x16">
<meta name="author" content="Dylan Price">
<meta name="author" content="Antoine de Saint Germain">
<meta name="description" content="Online tool for identifying thin sections under transmitted light, reflected light, or in plain eyesight">
<meta name="keywords" content="minerals, identify, microscope, thin section, transmitted, reflected, light">

</head>

<body>

<!--Top Nav Bar-->
<div class="topnav" id="myTopnav">
  <a href="index.html" id="homebutton" ></a>
  <a href="transmitted.html" style="width: 158px">Transmitted Light</a>
  <a href="reflected.html" style="width: 142px">Reflected Light</a> 
  <a href="definitions.html" style="width: 210px">Definitions of Properties</a>
  <a href="about.html" style="width: 65px">About</a>
  <a href="contact.html" style="width: 120px">Contact Us</a>
  <a href="javascript:void(0);" class="icon" onclick="topbarFunction()">
  <i class="fa fa-bars"></i>
  </a>
  
</div>

	

		
	
<!--Email Sending-->
	
<?php // Check if form was submitted:
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['recaptcha_response'])) {

    // Build POST request:
    $recaptcha_url = 'https://www.google.com/recaptcha/api/siteverify';
    $recaptcha_secret = '6Lcp5LIZAAAAAFwWcBVbz-EtqF3h5VpCDuqqmI0c';
    $recaptcha_response = $_POST['recaptcha_response'];

    // Make and decode POST request:
    $recaptcha = file_get_contents($recaptcha_url . '?secret=' . $recaptcha_secret . '&response=' . $recaptcha_response);
    $recaptcha = json_decode($recaptcha);

    // Take action based on the score returned:
    if ($recaptcha->score >= 0.5) {

	$userEmail	 	= $_POST['mel'];
	$userMessage 		= $_POST['content'];

	$to 			= "contact@namethatmineral.com";
	$subject 		= "Feedback Email";
	$body 			= "Information Submitted:";
	
$headers    = '';
$headers    = $headers."From: contact@namethatmineral.com"."\r\n";
$headers    = $headers."Reply-To: contact@namethatmineral.com"."\r\n";
$headers    = $headers."Content-Type: text/html; charset=ISO-8859-1\r\n";

	//$body .= "\r\n Name: " . $userName;
	$body .= "\r\n Email: " . $userEmail;
	$body .= "\r\n Message: " . $userMessage;
	


	if (mail($to, $subject, $body)){
		echo("<h3 style='color: #495057; margin-top:30px;'><center>Thank you for the feedback!</center></h3>");
} else {
echo("<h2>Something went wrong, please try again</h2>");
	}
		
		
    } else {
        // Nechoot verified - show form error
		echo(".");
		
		$userEmail	 	= $_POST['mel'];
	$userMessage 		= $_POST['content'];

	$to 			= "contact@namethatmineral.com";
	$subject 		= "Feedback Email";
	$body 			= "Information Submitted:";
	
$headers    = '';
$headers    = $headers."From: contact@namethatmineral.com"."\r\n";
$headers    = $headers."Reply-To: contact@namethatmineral.com"."\r\n";
$headers    = $headers."Content-Type: text/html; charset=ISO-8859-1\r\n";

	//$body .= "\r\n Name: " . $userName;
	$body .= "\r\n Email: " . $userEmail;
	$body .= "\r\n Message: " . $userMessage;
	


	if (mail($to, $subject, $body)){
		echo("<h3 style='color: #495057; margin-top:30px;'><center>Thank you for the feedback!</center></h3>");
} else {
echo("<h2>Something went wrong, please try again</h2>");
	}
    }
} ?>
	

	
	
</body>
<script type="text/javascript">
 //Top Bar Script 
function topbarFunction() {
  
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  
  } else {
    x.className = "topnav";
  
  }
} 
</script>

</html>