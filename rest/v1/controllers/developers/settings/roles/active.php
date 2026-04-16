<?php

// Set http header
require '../../../../core/header.php';
// Use needed functions
require '../../../../core/functions.php';
// Use models
require '../../../../models/developers/settings/roles/Roles.php';
//  Check database connection
$conn = null;
$conn = checkDbConnection($conn);
// Make use of classes for save database

$val = new Roles($conn);

// Get payload from frontend
$body = file_get_contents("php://input");
$data = json_decode($body, true);

if(array_key_exists('id', $_GET)) {
    // check data if exist and data is required
    checkPayload($data);
    $val->role_aid = $_GET['id'];
    $val->role_is_active = trim($data['isActive']);
    $val->role_updated = date("Y-m-d H:m:s");

    // Validate is id 
    checkId($val->role_aid);

    $query = checkActive($val);
    http_response_code(200);
    returnSuccess($val, 'role active', $query);
}
// return 404 if endpoint not available
checkEndpoint();