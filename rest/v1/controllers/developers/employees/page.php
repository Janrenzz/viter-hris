<?php

require '../../../core/header.php';
require '../../../core/functions.php';
require '../../../models/developers/employees/Employees.php';

$conn = null;
$conn = checkDbConnection($conn);

$val = new Employees($conn);

$body = file_get_contents("php://input");
$data = json_decode($body, true);

if(isset($_SERVER['HTTP_AUTHORIZATION'])) {
    // LIST / PAGE
    if (array_key_exists('start', $_GET)) {
        checkPayload($data);
        $val->start = $_GET['start'];
        $val->total = 10;
        $val->employee_is_active = $data['filterData'];
        $val->search = $data['searchValue'];
        $val->employee_updated = date("Y-m-d H:i:s");
    
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
        exit();
    }
}


checkEndpoint();