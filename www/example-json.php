<?php
sleep(3);
$msg = '';
$data = [];

try{

	$q = isset($_GET['q']) ? $_GET['q'] : '';
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
catch (\Exception $e){
	$msg = $e->getMessage();
}

echo json_encode(['msg' => $msg, 'data' => $data]);