<?php

$conn = null;
$conn = checkDbConnection();

$val = new Employees($conn);

if(empty($_GET)) {
    $query = checkReadAll($val);
    http_response_code(200);
    getQueriedData($query);
}

// Return 404 if endpoint not found
checkEndpoint();