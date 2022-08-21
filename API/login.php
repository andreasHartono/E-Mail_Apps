<?php
	header("Access-Control-Allow-Origin: *");
	extract($_POST);
	
	$c = new mysqli("localhost", "hybrid_160419047","ubaya","hybrid_160419047");
	$sql = "SELECT * FROM users WHERE email = ? AND password = ?";
	$stmt = $c->prepare($sql);
	$stmt->bind_param("ss",$email,$password);
	$stmt->execute();
	$result = $stmt->get_result();

	$ps = array();
	$i=0;
	
	if($result->num_rows>0) {
		while($r=mysqli_fetch_assoc($result)){
			$ps = ["result"=>"success","data"=>$r];
		}
	} else {
		$ps = ["result" => "fail", "error" => "Invalid Password"];
	}
	echo json_encode($ps);
	$c->close();

