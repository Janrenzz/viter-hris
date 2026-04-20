<?php

//  Check database connection
$conn = null;
$conn = checkDbConnection($conn);
// Make use of classes for save database
$val = new Users($conn);


if(array_key_exists("id", $_GET)) {
$val->users_is_active = 1;
$val->users_first_name = $data['users_first_name'];
$val->users_last_name = $data['users_last_name'];
$val->users_email = $data['users_email'];
$val->users_password = $data['users_password'];
$val->users_users_id = $data['users_users_id'];
$val->users_updated = date("Y-m-d H:m:s");
$val->users_description = $data['users_description'];
$val->users_updated = date("Y-m-d H:m:s");

$users_name_old = $data['users_name_old'];

// Validations
checkId($val->users_aid);
compareName($val, $users_name_old, $val->users_name);

$query = checkUpdate($val);
http_response_code(200);
returnSuccess($val, "Users Update", $query);

}

checkEndpoint();