<?php

// Set http header
require '../../../core/header.php';
// Use needed functions
require '../../../core/functions.php';
// Use models
require '../../../models/developers/employees/Employees.php';
//  Check database connection
$conn = null;
$conn = checkDbConnection($conn);
// Make use of classes for save database

$val = new Employees($conn);

// Get payload from frontend
$body = file_get_contents("php://input");
$data = json_decode($body, true);

if(array_key_exists('id', $_GET)) {
    // check data if exist and data is required
    checkPayload($data);
    $val->employee_aid = $_GET['id'];
    $val->employee_is_active = trim($data['isActive']);
    $val->employee_updated = date("Y-m-d H:m:s");

    // Validate is id 
    checkId($val->employee_aid);

    $query = checkActive($val);
    http_response_code(200);
    returnSuccess($val, 'Employees active', $query);
}
// return 404 if endpoint not available
checkEndpoint();