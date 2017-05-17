<?php require_once "./header.php" ?>

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

<?php require_once "./footer.php" ?>