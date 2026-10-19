<?php
declare(strict_types=1); require __DIR__ . '/../includes/bootstrap.php';
if ($_SERVER['REQUEST_METHOD'] !== 'POST') json_response(['success' => false, 'message' => 'Method not allowed.'], 405); require_csrf();
$name = post_string('full_name'); $email = filter_var(post_string('email'), FILTER_VALIDATE_EMAIL); $password = (string)($_POST['password'] ?? '');
if (mb_strlen($name) < 2 || mb_strlen($name) > 100 || !$email || !preg_match('/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/', $password)) json_response(['success' => false, 'message' => 'Enter a valid name, email and a strong password.'], 422);
$check = $pdo->prepare('SELECT id FROM users WHERE email = :email'); $check->execute(['email' => $email]); if ($check->fetch()) json_response(['success' => false, 'message' => 'An account already exists for this email.'], 409);
$stmt = $pdo->prepare('INSERT INTO users (full_name, email, password_hash, role) VALUES (:name, :email, :hash, "student")'); $stmt->execute(['name' => $name, 'email' => $email, 'hash' => password_hash($password, PASSWORD_DEFAULT)]); audit($pdo, (int)$pdo->lastInsertId(), 'registered'); json_response(['success' => true, 'message' => 'Account created. Please sign in.', 'redirect' => '../pages/login.html'], 201);
