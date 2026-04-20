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

$val = new Users($conn);

// Get payload from frontend
$body = file_get_contents("php://input");
$data = json_decode($body, true);

if(isset($_SERVER['HTTP_AUTHORIZATION'])) {
    
    if(array_key_exists('start', $_GET)) {
        // check data if exist and data is required
        checkPayload($data);
        $val->start = $_GET['start'];
        $val->total = 10;
         // for filter
        $val->users_is_active = trim($data['filterData']);
        $val->search = $data['searchValue'];
    
        // Validate is id 
        checkLimitId($val->start, $val->total);
    
        $query = checkReadLimit($val);
        $total_result = checkReadAll($val);
        http_response_code(200);
        checkReadQuery(
            $query,
            $total_result,
            $val->total,
            $val->start
        );
    }
    // return 404 if endpoint not available
    checkEndpoint();

}
// If access is not valid then return access Error
checkAccess();