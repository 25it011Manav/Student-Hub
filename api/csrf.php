<?php
declare(strict_types=1);
require __DIR__ . '/../includes/bootstrap.php';
if ($_SERVER['REQUEST_METHOD'] !== 'GET') json_response(['success' => false, 'message' => 'Method not allowed.'], 405);
json_response(['success' => true, 'token' => csrf_token()]);
