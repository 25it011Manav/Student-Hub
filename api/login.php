<?php
declare(strict_types=1); require __DIR__ . '/../includes/bootstrap.php';
if ($_SERVER['REQUEST_METHOD'] !== 'POST') json_response(['success' => false, 'message' => 'Method not allowed.'], 405); require_csrf();
$email = filter_var(post_string('email'), FILTER_VALIDATE_EMAIL); $password = (string)($_POST['password'] ?? ''); if (!$email || $password === '') json_response(['success' => false, 'message' => 'Enter your email and password.'], 422);
$stmt = $pdo->prepare('SELECT id, full_name, email, password_hash, role FROM users WHERE email = :email AND is_active = 1'); $stmt->execute(['email' => $email]); $user = $stmt->fetch();
if (!$user || !password_verify($password, $user['password_hash'])) { audit($pdo, null, 'failed_login'); json_response(['success' => false, 'message' => 'Invalid email or password.'], 401); }
session_regenerate_id(true); $_SESSION['user'] = ['id' => (int)$user['id'], 'name' => $user['full_name'], 'role' => $user['role']]; $_SESSION['csrf'] = bin2hex(random_bytes(32)); audit($pdo, (int)$user['id'], 'logged_in'); json_response(['success' => true, 'message' => 'Signed in successfully.', 'redirect' => '../pages/dashboard.html']);
