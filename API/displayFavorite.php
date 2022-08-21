<?php
	header("Access-Control-Allow-Origin: *");
	$c = new mysqli("localhost", "hybrid_160419047","ubaya","hybrid_160419047");

	extract($_POST);

	$sql = "SELECT * FROM favorite WHERE users_id = ?";
	$stmt = $c->prepare($sql);
    $stmt->bind_param("i",$id);
    $stmt->execute();
	$result = $stmt->get_result();

	$ps = array();
	$i=0;

	while ($obj = $result->fetch_assoc()) {
		$ps[$i]['id'] = $obj['messages_id'];

		//Get Email
		$idEmail = $obj['messages_id'];
		$sqlMail = "SELECT * FROM messages WHERE id = $idEmail";
		$resultMail = $c->query($sqlMail);
		$hasil1 = $resultMail->fetch_assoc();

		//Get Receiver Email
		$idReceiver = $hasil1['receiver'];
		$sqlRece = "SELECT email FROM users WHERE id = $idReceiver";
		$resultRece = $c->query($sqlRece);
		$hasil2 = $resultRece->fetch_assoc();
		$ps[$i]['reciver'] = $hasil2['email'];

		//Get File
		$sqlFile = "SELECT * FROM files WHERE id = $idEmail";
		$resultFile = $c->query($sqlFile);
		$hasil = $resultFile->fetch_assoc();
		$ps[$i]['file'] = "https://ubaya.fun/hybrid/160419095/img/".$hasil['idmessage'].".".$hasil['extension'];

		$ps[$i]['subject'] = addslashes(htmlentities($hasil1['subject']));
		$i++;
	}	
	echo json_encode($ps);
	$c->close();

