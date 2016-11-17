<?php

	require_once('database.php');

	session_start();

	// Adding mysqli to escape user inputs to prevent SQL injection
	$question = mysqli_real_escape_string($link, $_POST["ctf-question"]);
	$answer = mysqli_real_escape_string($link, $_POST["ctf-answer"]);
	$point = mysqli_real_escape_string($link, $_POST["ctf-point"]);
	$hint = mysqli_real_escape_string($link, $_POST["ctf-hint-deductions"]);
	$link = mysqli_real_escape_string($link, $_POST["ctf-link"]);
	$steps = mysqli_real_escape_string($link, $_POST["ctf-steps"]);
	
	$sql = "INSERT INTO Table_name (column1, column2)
					VALUES
					('$question', '$answer', '$point', '$hint', '$link', '$steps')";

	$result = mysql_query($sql);

	if($result){
    echo("<br>Input data is succeed");
	} else{
    echo("<br>Input data is fail");
	}
	
	mysqli_close($conn); // close connection
?>