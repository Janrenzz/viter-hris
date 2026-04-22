<?php

// Set http header
require '../../../../core/header.php';

// Use needed functions
require '../../../../core/functions.php';

// Use models
require '../../../../models/developers/settings/users/Users.php';

// Check database connection
$conn = null;
$conn = checkDbConnection($conn);

// Make use of classes for save database
$val = new Users($conn);

if (array_key_exists("id", $_GET)) {

    $val->users_aid = $_GET['id'];

    // VALIDATION
    checkId($val->users_aid);

    $query = checkDelete($val);

    http_response_code(200);
    returnSuccess($val, "Users Delete", $query);
}

checkEndpoint();