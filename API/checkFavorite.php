<?php  
  header("Access-Control-Allow-Origin: *");
  $c = new mysqli("localhost", "hybrid_160419047","ubaya","hybrid_160419047");

  extract($_POST);

  $sql = "SELECT * FROM favorite WHERE messages_id = ? AND users_id=?";
  
  $stmt = $c->prepare($sql);
  $stmt->bind_param("ii",$messageId,$userId);
  $stmt->execute();
  $result = $stmt->get_result();
  
  $ps = array();

 if($result->num_rows>0) {
    while($r=mysqli_fetch_assoc($result)){
      $ps = ["result"=>"success"];
    }
  } else {
    $ps = ["result" => "fail"];
  }
  
  echo json_encode($ps);
  $c->close();
