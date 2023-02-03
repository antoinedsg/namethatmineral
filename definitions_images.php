<?php
// Collect the id of the definition we have clicked on
$id = $_GET['id'];
// Establish a connection from the browser (localhost) to the database
  $conn = mysqli_connect('localhost', 'namehwxi_root','azerty123','namehwxi_definitions');

// Select all the columns from the 'definitions' datatable, with the requirement that the 'Words' entry be a variable (to be determined by $a)
  $sql = 'SELECT * FROM definitions WHERE Words = ? ';
 $stmt = $conn->prepare($sql);
// $stmt = mysqli_prepare($conn, $sql);

// Bind the variable $a into a string "s" so that it can be read by the SELECT statement
 $stmt -> bind_param("s",$id);
//  mysqli_stmt_bind_param($stmt,'s',$id);

//$result = mysqli_query($conn,$sql);

  mysqli_stmt_execute($stmt);
  $result = mysqli_stmt_get_result($stmt);


//  $stmt->execute();
// $result = $stmt->get_result();
 $output = $result->fetch_assoc();

 print_r($output["Definitions"]);

?>