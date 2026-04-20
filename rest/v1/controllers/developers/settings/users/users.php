<?php

// Set http header
require '../../../../core/header.php';
// Use needed functions
require '../../../../core/functions.php';
// Use models
require '../../../../models/developers/settings/users/Users.php';


// Get payload from frontend
$body = file_get_contents("php://input");
$data = json_decode($body, true);

if($_SERVER['HTTP_AUTHORIZATION']) {
    
    // CREATE / POST
    if($_SERVER['REQUEST_METHOD'] === 'POST'){
        $result = require 'create.php';
        sendResponse($result);
        exit();
    }
    if($_SERVER['REQUEST_METHOD'] === 'GET'){
        $result = require 'read.php';
        sendResponse($result);
        exit();
    }
    // UPDATE / PUT
    if($_SERVER['REQUEST_METHOD'] === 'PUT'){
        $result = require 'update.php';
        sendResponse($result);
        exit();
    }
    // DELETE
    if($_SERVER['REQUEST_METHOD'] === 'DELETE'){
        $result = require 'delete.php';
        sendResponse($result);
        exit();
    }

}

// Return Access Error
checkAccess();
