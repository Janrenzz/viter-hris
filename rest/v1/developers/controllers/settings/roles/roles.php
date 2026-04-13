<?php

// Set http header
require '../../../core/header.php';
// Use needed functions
require '../../../core/function.php';


// Get payload from frontend
$body = file_get_contents("php://input");
$data = json_decode($body, true);


// CREATE / POST
if($_SERVER['REQUEST_METHOD'] === 'POST'){
    $result = require 'create.php';
    sendResponse($result);
    exit();
}