<!doctype html>
<html lang="en">
<head>
    <title>Hello, world!</title>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous">
    <link rel="stylesheet" href="../../src/jquery.inputpicker.css" />
</head>
<body>
<div class="container">
    <div style="padding:50px"></div>
    <div class="form-group row">
        <label for="type" class="col-4 col-form-label">Type</label>
        <div class="col-8">
            <input id="mytype" class="form-control" name="type" value="" />
        </div>
    </div>

    <div class="form-group row">
        <label for="name" class="col-4 col-form-label">Name</label>
        <div class="col-8">
            <input id="name" class="form-control" name="name" value="" type="text">
        </div>
    </div>
</div>


<!-- Optional JavaScript -->
<!-- jQuery first, then Popper.js, then Bootstrap JS --><script
    src="https://code.jquery.com/jquery-3.2.1.min.js"
    integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
    crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js" integrity="sha384-vFJXuSJphROIrBnz7yo7oB41mKfc8JzQZiCq4NCceLEaO4IHwicKwpJf9c9IpFgh" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js" integrity="sha384-alpBpkh1PFOepccYVYDB4do5UnbKysX5WZXm3XxPqe5iKTfUKjNkCk9SaVuEZflJ" crossorigin="anonymous"></script>
<script src="../../src/jquery.inputpicker.js"></script>


<script>
    $(document).ready(function () {
        var url = '/my_json_url';
        $('#mytype').inputpicker({
            width: '100%',
            height: 300,
            headShow: true,
            url: '../example-json.php',
            fields:['id','name','hasc'],
            fieldText:'name',
            fieldValue:'id',
            // responsive: true,
            autoOpen: true
        });
    });

    $("#mytype").parent().bind('resize', function(){
        console.log('resized');
    });;
</script>
</body>
</html>