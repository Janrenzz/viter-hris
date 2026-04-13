<?php 

require 'Database.php';
require 'Response.php';

function sendResponse($result) {
    $response = new Response();
    $response->setSuccess(true);
    $response->setStatusCode(200);
    $response->setData($result);
    $response->send();
}

function checkDbConnection() {
    try {
        $conn = Database::connectDb();
        return $conn;
    } catch(PDOException $error) {
        $error = [];
        $error['type'] = "Invalid_reqest error";
        $error['success'] = false;
        $error['error'] = "Database connnection failed";
        $response = new Response();
        $response->setSuccess(false);
        $response->setData($$error);
        $response->send();
        exit;
    }
}