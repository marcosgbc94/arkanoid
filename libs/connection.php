<?php

include_once "config.php";

$conn = new mysqli(SERVER_NAME, SERVER_USER, SERVER_PASS, DATABASE_NAME);

// Comprobar conección a Base de Datos
if ($conn->connect_error) {
//   die("Connection failed: " . $conn->connect_error);
}
// echo "Connected successfully";
?>