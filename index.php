<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8" >
    <title>jQuery UI Input Picker by Ukalpa</title>
    <script>
        function dd(d) {
            console.log(d);
        }
    </script>

    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

    <!-- Optional theme -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">

    <link rel="stylesheet" href="src/jquery.inputpicker.css?<?php echo time();?>" />

    <script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous"></script>
    <!-- Latest compiled and minified JavaScript -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>

    <script src="src/jquery.inputpicker.js?<?php echo time();?>"></script>



    <style>
        .list-group-item {
            padding:3px 10px;
        }
    </style>
</head>
<body>
<div class="container">
    <div class="row">
        <div class="col-md-12">
            <h2>Inputpicker</h2>
        </div>
    </div>
    <div class="row" style="margin-top:5px;">
        <!--<div class="col-md-2">-->
        <!--<div class="list-group small">-->
        <!--&lt;!&ndash;<a href="#" class="list-group-item active">&ndash;&gt;-->
        <!--&lt;!&ndash;ABC&ndash;&gt;-->
        <!--&lt;!&ndash;</a>&ndash;&gt;-->
        <!--<a href="#" class="list-group-item">Basic</a>-->
        <!--</div>-->
        <!--</div>-->
        <!--<div class="col-md-10">-->
        <!--<section>-->
        <!--<h5>Basic</h5>-->
        <!--</section>-->
        <!--</div>-->

        <div class="col-sm-12">
            <h3>Basic</h3>
            <section class="row">
                <div class="col-sm-6">
                    <h4>Example</h4>
                    <div class="text-center">
                        <input class="form-control" id="test1" value="2" />
                    </div>
                </div>
                <div class="col-sm-6">
                </div>
            </section>
        </div>
    </div>
</div>

<script>
    $(function () {
        $('#test1').inputpicker({
            data:[
                {value:"1",text:"Text 1"},
                {value:"2",text:"Text 2"},
                {value:"3",text:"Text 3"}
            ],
            fields:[
                {name:'value',text:'Id'},
                {name:'text',text:'Title'}
            ],
            field_text : 'text',
            field_value: 'value',   // The field
            limit: 10,
            pagination: false,
            searchOpen: true, // true: searchType and searchField will be active, other
            searchType:'',   // left: start matching from left, any other - match completely
            searchField1: 'value'    // 1.'' - all fields, 2.'name' - one field, 3.['name', 'text'] - specific fields,
        });
    })
</script>
</body>
</html>