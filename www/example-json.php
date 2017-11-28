<?php
$sleep = isset($_GET['sleep']) ? intval($_GET['sleep']) : 0;
if($sleep > 3 || $sleep < 0)    $sleep = 0;
if($sleep)
sleep($sleep);
$msg = '';
$data = [];

try{

    $count = 0;
    $prev_page = 1;
    $next_page = 1;

	$q = isset($_GET['q']) ? $_GET['q'] : '';
	$p = isset($_GET['p']) ? $_GET['p'] : '';   // Page


    if($p){
        $list = json_decode(file_get_contents('../src/example-districts.json'), true)['data'];
        $count = count($list);
        $per_page = isset($_GET['per_page']) ? intval($_GET['per_page']) : 10;   // Per Page
        if($per_page < 1)   $per_page = 10;

        $first_page = 1;
        $last_page = ceil($count / $per_page);

        if($p < $first_page) $p = $first_page;
        if($p > $last_page) $p = $last_page;

        $prev_page = $p > 1 ? ($p - 1) : 1;
        $next_page = $p < $last_page ? ($p + 1) : $last_page;


        $i = 0;
        foreach($list as $v){
            if ($i >= (($p - 1) * $per_page) && $i < ( $p * $per_page) ){
                $data[] = $v;
            }
            $i++;
        }
    }
    else{
        foreach(json_decode(file_get_contents('../src/example-districts.json'), true)['data'] as $v){
            $is = true;
            if($q){
                $is = false;
                foreach($v as $vv){
                    if ($q && stripos($vv, $q) !== false){
                        $is = true;
                        break;
                    }
                }
            }
            if ($is)    $data[] = $v;
        }
    }


}
catch (\Exception $e){
	$msg = $e->getMessage();
}
finally{

    if($p){
        // , 'prev_page' => $prev_page, 'next_page' => $next_page
        echo json_encode(['msg' => $msg, 'p' => $p, 'count' => $count, 'per_page' => $per_page
            , 'data' => $data]);
    }
    else{
        echo json_encode(['msg' => $msg, 'data' => $data]);
    }
}
