<?php  
	header("Access-Control-Allow-Origin: *");
	$c = new mysqli("localhost", "hybrid_160419047","ubaya","hybrid_160419047");

	extract($_POST);

	$sql = "SELECT * FROM users WHERE id = ?";
	$stmt = $c->prepare($sql);
    $stmt->bind_param("i",$id);
    $stmt->execute();
	$result = $stmt->get_result();

	$ps = array();

	while ($obj = $result->fetch_assoc()) {
		$ps['first'] = $obj['first_name'];
		$ps['last'] = $obj['last_name'];
		$ps['email'] = $obj['email'];
	}	
	echo json_encode($ps);
	$c->close();
