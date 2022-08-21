<?php
	header("Access-Control-Allow-Origin: *");
	extract($_POST);
	
	$c = new mysqli("localhost", "hybrid_160419047","ubaya","hybrid_160419047");

	$sql1 = "DELETE FROM files WHERE idmessage = ?";
	$stmt1 = $c->prepare($sql1);
	$stmt1->bind_param("i",$id);
	$stmt1->execute();

	$sql2 = "DELETE FROM favorite WHERE messages_id = ?";
	$stmt2 = $c->prepare($sql2);
	$stmt2->bind_param("i",$id);
	$stmt2->execute();

	$sql = "DELETE FROM messages WHERE id = ?";
	$stmt = $c->prepare($sql);
	$stmt->bind_param("i",$id);
	$stmt->execute();

	$fileName = $id.".jpg";
	unlink("img/".$fileName);

	$arr = array();
	
	if($stmt->affected_rows > 0) {
    	$arr = ["result" => "success"];
	} else {
	    $arr = ["result" => $c->error];
	}

	echo json_encode($arr);
	$c->close();
