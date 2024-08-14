<?php

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
echo json_encode(['message' => 'this is root page not api']);

?>