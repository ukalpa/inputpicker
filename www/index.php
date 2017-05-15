<?php
function ip_html($code){
	return htmlentities($code);
}
$test_index = 0;
$ip_src = '../src/';
?>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8" >
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Inputpicker - A jQuery plugin of supporting multiple columns by Ukalpa</title>
    <meta name="author" content="ukalpa@gmail.com">
    <meta name="description" content="Inputpicker - A jQuery plugin of supporting multiple columns by Ukalpa">

    <meta name="viewport" content="width=device-width">
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



    <style>
        body{
            position: relative;
            margin:0;
            padding:0;
        }
        header {
            background-color:#e8e8e8;
        }
        header .navbar-brand{
            margin-top:0px;
            font-size:24px;
            color:#337ab7;
        }
        header .description{
            font-size:16px;
            position: absolute;
            margin-left:150px;
            margin-top:15px;
            color:#555555;
        }
        header .nav a {
            padding-top: 18px;
            font-size:16px;
        }
        .icon-bar {
            background-color: #337ab7;
        }

        .ip-content {
            /*margin-top:20px;*/
        }

        .ip-side-nav {
            margin-top:20px;
        }
        .ip-side-nav>li>a{
            font-size:13px;
            padding:1px 10px;
            /*color:#555555;*/
        }

        .ip-side-nav ul.nav>li>a {
            font-size:13px;
            display: block;
            padding: 0px 20px;
        }

        .affix {
            top:0px;
        }
        .mt10 {margin-top:10px;}
        .mt20 {margin-top:20px;}

        section {
            margin-bottom:20px;
        }

        section h4 {
            margin-top:20px;
        }

        .hljs {
            background-color: #f5f5f5;
        }
    </style>
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
                <li class="active"><a href="#">Examples</a></li>
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

<div class="container">
    <div class="row">
        <div class="col-sm-3 pull-right hidden-xs hidden-sm">
            <div class="ip-side-bar">
                <ul class="nav nav-pills nav-stacked ip-side-nav" data-spy="affix" data-offset-top="55">
                    <li><a href="#basic">The Basic uses</a>
                        <ul class="nav">
                            <li class="active"><a href="#basic-single">Basic</a></li>
                            <li><a href="#basic-multiple-fields">Multiple fields</a></li>
                            <li><a href="#basic-filter-input">Filter input</a></li>
                        </ul>
                    </li>
                    <li><a href="#remote">Remote data</a>
                        <ul class="nav">
                            <li class="active"><a href="#remote-json">JSON</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
        <div class="col-sm-9">
            <div class="ip-content" style="">

                <!-- Start examples-->
                <a name="basic"></a>
                <h2>Basic uses</h2>
                <!-- Begin section 1 -->
				<?php $test_index++; ?>
                <section class="row">
                    <div class="col-sm-12">
                        <a name="basic-single"></a>
                        <h3>Basic</h3>
                        <p>
                            Initiate a basic input with multiple options
                        </p>
                        <h4>Example</h4>
                        <div class=" ">
                            <input class="form-control" id="test<?php echo $test_index ?>" value="Text 2" required />
                        </div>
                        <h4>Source code</h4>
                        <pre><code class="html"><?php echo ip_html("<input class=\"form-control\" id=\"test\" value=\"Text 2\" />
<script>
$('#test').inputpicker({
    data:[ \"Text 1\", \"Text 2\", \"Text 3\" ]
});
</script>
");
								?></code></pre>
                    </div>
                    <script>
                        $(function () {
                            $('#test<?php echo $test_index ?>').inputpicker({
                                data:[ "Text 1", "Text 2", "Text 3" ]
                            });
                        });
                    </script>

                </section>
                <!-- End Section -->



                <!-- Begin section 2 -->
				<?php $test_index++; ?>
                <section class="row">
                    <div class="col-sm-12">
                        <a name="basic-multiple-fields"></a>
                        <h3>Multiple fields</h3>
                        <p>
                            You set multiple fields and show them in a line and also show the head by setting the option "headShow".

                        </p>
                        <h4>Example</h4>
                        <div class=" ">
                            <input class="form-control" id="test<?php echo $test_index ?>" value="2" />
                        </div>
                        <h4>Source code</h4>
                        <pre><code class="html"><?php echo ip_html("<input class=\"form-control\" id=\"test\" value=\"2\" />
<script>
$('#test').inputpicker({
    data:[
        {value:\"1\",text:\"Text 1\", description: \"This is the description of the text 1.\"},
        {value:\"2\",text:\"Text 2\", description: \"This is the description of the text 2.\"},
        {value:\"3\",text:\"Text 3\", description: \"This is the description of the text 3.\"}
    ],
    fields:[
        {name:'value',text:'Id'},
        {name:'text',text:'Title'},
        {name:'description',text:'Description'}
    ],
    headShow: true,
    fieldText : 'text',
    fieldValue: 'value'
    });
</script>");
								?></code></pre>
                    </div>
                    <script>
                        $(function () {
                            $('#test<?php echo $test_index ?>').inputpicker({
                                data:[
                                    {value:"1",text:"Text 1", description: "This is the description of the text 1."},
                                    {value:"2",text:"Text 2", description: "This is the description of the text 2."},
                                    {value:"3",text:"Text 3", description: "This is the description of the text 3."}
                                ],
                                fields:[
                                    {name:'value',text:'Id'},
                                    {name:'text',text:'Title'},
                                    {name:'description',text:'Description'}
                                ],
                                headShow: true,
                                fieldText : 'text',
                                fieldValue: 'value'
                            });
                        });
                    </script>

                </section>
                <!-- End Section -->


                <!-- Begin section 3 -->
				<?php $test_index++; ?>
                <section class="row">
                    <div class="col-sm-12">
                        <a name="basic-filter-input"></a>
                        <h3>Filter input</h3>
                        <p>
                            Set "filterOpen" as true/false to filter/un-filter the result from the list, set "filterType" to choose the filter type and "filterField" to choose which fields would be searched

                        </p>
                        <h4>Example</h4>
                        <div class=" ">
                            <input class="form-control" id="test<?php echo $test_index ?>" value="2" />
                        </div>
                        <h4>Source code</h4>
                        <pre><code class="html"><?php echo ip_html("<input class=\"form-control\" id=\"test\" value=\"2\" />
<script>
$('#test').inputpicker({
    data:[
        {value:\"1\",text:\"Text 1\", description: \"This is the description of the text 1.\"},
        {value:\"2\",text:\"Text 2\", description: \"This is the description of the text 2.\"},
        {value:\"3\",text:\"Text 3\", description: \"This is the description of the text 3.\"}
    ],
    fields:['value','text','description'],
    fieldText : 'text',
    headShow: true,
    filterOpen: true
});
</script>");
								?></code></pre>
                    </div>
                    <script>
                        $(function () {
                            $('#test<?php echo $test_index ?>').inputpicker({
                                data:[
                                    {value:"1",text:"Text 1", description: "This is the description of the text 1."},
                                    {value:"2",text:"Text 2", description: "This is the description of the text 2."},
                                    {value:"3",text:"Text 3", description: "This is the description of the text 3."}
                                ],
                                fields:['value','text','description'],
                                fieldText : 'text',
                                headShow: true,
                                filterOpen: true
                            });
                        });
                    </script>

                </section>
                <!-- End Section -->

                <a name="remote"></a>
                <h2>Remote data</h2>
                <!-- Begin section 1 -->
				<?php $test_index++; ?>
                <section class="row">
                    <div class="col-sm-12">
                        <a name="remote-json"></a>
                        <h3>JSON</h3>
                        <p>
                            Load JSON file <a href="<?php echo $ip_src ?>example-regions.json" target="_blank">regions.json</a> and parse it into the list
                        </p>
                        <h4>Example</h4>
                        <div class=" ">
                            <input class="form-control" id="test<?php echo $test_index ?>" value="2" />
                        </div>
                        <h4>Source code</h4>
                        <pre><code class="html"><?php echo ip_html("<input class=\"form-control\" id=\"test\" value=\"Text 2\" />
<script>
$('#test').inputpicker({
    url: '". $ip_src ."example-regions.json',
    fields:['id','name','hasc'],
    fieldText:'name',
    fieldValue:'id'
});
</script>
");
								?></code></pre>
                    </div>
                    <script>
                        $(function () {
                            $('#test<?php echo $test_index ?>').inputpicker({

//                                url: '<?php echo $ip_src ?>example-districts.json'
                                url: '<?php echo $ip_src ?>example-regions.json',
//                                url: '<?php echo $ip_src ?>example-regions.json',
                                fields:['id','name','hasc'],
                                fieldText:'name',
                                fieldValue:'id',
                                limit: 10,
                                headShow : false
                            });
                        });
                    </script>

                </section>
                <!-- End Section -->



            </div>

        </div>
    </div>
</div>
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

    })

</script>
</body>
</html>


