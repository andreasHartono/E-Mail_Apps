<?php
	header("Access-Control-Allow-Origin: *");
	$c = new mysqli("localhost", "hybrid_160419047","ubaya","hybrid_160419047");

	extract($_POST);

	$sql = "SELECT * FROM messages WHERE id = ?";
	$stmt = $c->prepare($sql);
    $stmt->bind_param("i",$id);
    $stmt->execute();
	$result = $stmt->get_result();

	$ps = array();
	$i=0;

	while ($obj = $result->fetch_assoc()) {
		$ps[$i]['id'] = $obj['id'];

		//Get Recipient Email
		$idRecipient = $obj['recipient'];
		$sqlReci = "SELECT email FROM users WHERE id = $idRecipient";
		$resultReci = $c->query($sqlReci);
		$hasil1 = $resultReci->fetch_assoc();
		$ps[$i]['recipient'] = $hasil1['email'];

		//Get Receiver Email
		$idReceiver = $obj['receiver'];
		$sqlRece = "SELECT email FROM users WHERE id = $idReceiver";
		$resultRece = $c->query($sqlRece);
		$hasil2 = $resultRece->fetch_assoc();
		$ps[$i]['receiver'] = $hasil2['email'];

		//Get File
		$idMessages = $obj['id'];
		$sqlFile = "SELECT * FROM files WHERE id = $idMessages";
		$resultFile = $c->query($sqlFile);
		$hasil = $resultFile->fetch_assoc();
		$ps[$i]['file'] = "https://ubaya.fun/hybrid/160419095/img/".$hasil['idmessage'].".".$hasil['extension'];

		$ps[$i]['subject'] = addslashes(htmlentities($obj['subject']));
		$ps[$i]['message'] = addslashes(htmlentities($obj['message']));
		$i++;
	}	
	echo json_encode($ps);
	$c->close();

