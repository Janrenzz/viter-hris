<?php

// Set http header
require '../../../../core/header.php';
// Use needed functions
require '../../../../core/functions.php';
// Use models
require '../../../../models/developers/settings/users/Users.php';
//  Check database connection
$conn = null;
$conn = checkDbConnection($conn);
// Make use of classes for save database

require $val = new Users($conn);

// Get payload from frontend
$body = file_get_contents("php://input");
$data = json_decode($body, true);

if(array_key_exists('id', $_GET)) {
    // check data if exist and data is required
    checkPayload($data);
    $val->users_aid = $_GET['id'];
    $val->users_is_active = trim($data['isActive']);
    $val->users_updated = date("Y-m-d H:m:s");

    // Validate is id 
    checkId($val->users_aid);

    $query = checkActive($val);
    http_response_code(200);
    returnSuccess($val, 'Roles active', $query);
}
// return 404 if endpoint not available
checkEndpoint();