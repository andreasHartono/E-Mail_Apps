<?php  
  header("Access-Control-Allow-Origin: *");
  $c = new mysqli("localhost", "hybrid_160419047","ubaya","hybrid_160419047");

  extract($_POST);

  $sql = "INSERT INTO favorite(users_id, messages_id) VALUES(?,?)";
  
  $stmt = $c->prepare($sql);
  $stmt->bind_param("ii",$userId, $messageId);
  $stmt->execute();

  $arr = array();
  
  if($stmt->affected_rows > 0) {
    $arr = ["result" => "success"];
  } else {
    $arr = ["result" => $c->error];
  }
  
  echo json_encode($arr);
  $c->close();
