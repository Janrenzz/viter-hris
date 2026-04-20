<?php

//  Check database connection
$conn = null;
$conn = checkDbConnection($conn);
// Make use of classes for save database
$val = new Roles($conn);

$val->role_is_active = 1;
$val->role_first_name = trim($data['role_first_name']);
$val->role_last_name = trim($data['role_last_name']);
$val->role_email = trim($data['role_email']);
$val->role_created = date("Y-m-d H:m:s");
$val->role_updated = date("Y-m-d H:m:s");

// VALIDATIONS
isNameExist($val, $val->role_first_name);

$query = checkCreate($val);
http_response_code(200);
returnSuccess($val, "Roles Create", $query);
