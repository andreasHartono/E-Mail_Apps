<?php  
	header("Access-Control-Allow-Origin: *");
	$c = new mysqli("localhost", "hybrid_160419047","ubaya","hybrid_160419047");

	extract($_POST);
	
	$sql = "UPDATE users SET first_name =?, last_name=? WHERE id = ?";
	$stmt = $c->prepare($sql);
    $stmt->bind_param("ssi",$first, $last, $id);
    $stmt->execute();

    $arr = array();

    if($stmt->affected_rows) {
    	$arr["message"] = "success insert data";
    }else{
    	$arr["message"] = "Insert Data Failed";
    }

    echo json_encode($arr);
    $c->close();
