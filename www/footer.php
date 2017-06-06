
<footer>
	<div class="container-fluid">
		<div style="text-align: center;">
			Copyright @ 2017 <a href="http://ukalpa.com">ukalpa</a>
		</div>
	</div>
</footer>

<script>
    $(function () {
        $('pre code').each(function(i, block) {
            hljs.highlightBlock(block);
        });
    });



</script>

<?php
if(file_exists('./analyticstracking.php')){
	include_once("./analyticstracking.php");
}

?>
</body>
</html>
