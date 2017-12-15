<?php
function ip_html($code){
	return htmlentities($code);
}
$test_index = 0;
$ip_src = '../src/';
$current_page = strtolower(basename($_SERVER['SCRIPT_FILENAME']));
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html;charset=utf-8" >
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>Inputpicker - A jQuery plugin of supporting multiple columns by Ukalpa(ukalpa@gmail.com)</title>
	<meta name="author" content="ukalpa@gmail.com">
	<meta name="description" content="Inputpicker - A jQuery plugin of supporting multiple columns by Ukalpa">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<script>
        function dd(d) {
            console.log(d);
        }
	</script>


	<!-- Latest compiled and minified CSS -->
	<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

	<!-- Optional theme -->
	<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">

	<link rel="stylesheet" href="<?php echo $ip_src ?>jquery.inputpicker.css?<?php echo time();?>" />

	<script src="//code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous"></script>
	<!-- Latest compiled and minified JavaScript -->
	<script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>

	<script src="<?php echo $ip_src ?>jquery.inputpicker.js?<?php echo time();?>"></script>

	<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.11.0/styles/default.min.css">
	<script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.11.0/highlight.min.js"></script>
	<link rel="stylesheet" href="./style.css?<?php echo time()?>" >
</head>
<body>
<header class="navbar">
	<div class="container-fluid">
		<div class="navbar-header">
			<button aria-controls="bs-navbar" aria-expanded="false" class="navbar-toggle collapsed" data-target="#bs-navbar" data-toggle="collapse" type="button"> <span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button>
			<a href="../" class="navbar-brand">Inputpicker</a>
		</div>
		<div class="description hidden-xs" style="">
			<i>A jQuery input picker plugin supporting multiple columns in input box.</i>
		</div>
		<nav class="navbar-collapse collapse" id="bs-navbar" aria-expanded="false" >
			<ul class="nav navbar-nav navbar-right">
				<li <?php if($current_page == "index.php") echo "class=\"active\""; ?> ><a href="./">Examples</a></li>
				<li  <?php if($current_page == "doc.php") echo "class=\"active\""; ?> ><a href="./doc.php">Documents</a></li>
				<li><a href="https://github.com/ukalpa/inputpicker/archive/master.zip" target="_blank">Download</a></li>
				<li><a href="https://github.com/ukalpa/inputpicker" target="_blank">Source code on GitHub</a></li>
				<li><a href="https://github.com/ukalpa/inputpicker/issues" target="_blank">Help</a></li>
				<li><a href="http://ukalpa.com" target="_blank">Author</a></li>
			</ul>
		</nav>
		<div class="pull-right">

		</div>
	</div>
</header>