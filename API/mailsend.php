<?php
header("Access-Control-Allow-Origin: *");

extract($_POST);

$c = new mysqli("localhost","hybrid_160419047","ubaya","hybrid_160419047");
$sql = "SELECT id FROM users WHERE email = ?";

$stmt = $c->prepare($sql);
$stmt->bind_param('s',$email);
$stmt->execute();
$result = $stmt->get_result();

$data = $result->fetch_assoc();
$idReceiver = $data['id'];

$sql2 = "INSERT INTO messages (recipient, receiver,subject,message) VALUES(?,?,?,?)";

$stmt2 = $c->prepare($sql2);
$stmt2->bind_param("iiss",$id,$idReceiver,$subject,$content);
$stmt2->execute();

$arr = array();

if($stmt2->affected_rows) {
    if($image != "") {
        $idmessage = $stmt2->insert_id;
        $img = str_replace('data:image/jpeg;base64,','',$image);
        $img = str_replace(' ', '+', $img);
        $data2 = base64_decode($img);
        file_put_contents('img/'.$idmessage.'.jpg', $data2);

        $ext = "jpg";
        $sql3 = "INSERT INTO files (extension,idmessage) VALUES (?,?)";
        $stmt3 = $c->prepare($sql3);
        $stmt3->bind_param("si",$ext,$idmessage);
        $stmt3->execute();
    }

    $arr["message"] = "success insert data";
} else {
    $arr["message"] = "Insert Data Failed";
}

echo json_encode($arr);