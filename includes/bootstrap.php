<?php
declare(strict_types=1);
$configFile = __DIR__ . '/../config/config.php';
if (!is_file($configFile)) { http_response_code(503); header('Content-Type: application/json; charset=utf-8'); echo json_encode(['success' => false, 'message' => 'Server setup is incomplete. Copy config/config.example.php to config.php and configure MySQL.']); exit; }
$config = require $configFile;
session_name('studenthub_session'); session_set_cookie_params(['httponly' => true, 'samesite' => 'Lax', 'secure' => !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off']); session_start();
try { $pdo = new PDO("mysql:host={$config['db_host']};dbname={$config['db_name']};charset=utf8mb4", $config['db_user'], $config['db_pass'], [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC, PDO::ATTR_EMULATE_PREPARES => false]); } catch (PDOException $exception) { http_response_code(503); header('Content-Type: application/json; charset=utf-8'); echo json_encode(['success' => false, 'message' => 'Database connection is unavailable.']); exit; }
function json_response(array $payload, int $status = 200): never { http_response_code($status); header('Content-Type: application/json; charset=utf-8'); echo json_encode($payload); exit; }
function post_string(string $key): string { return trim((string)($_POST[$key] ?? '')); }
function audit(PDO $pdo, ?int $userId, string $action): void { $stmt = $pdo->prepare('INSERT INTO audit_logs (user_id, action, ip_address) VALUES (:user_id, :action, :ip)'); $stmt->execute(['user_id' => $userId, 'action' => $action, 'ip' => substr((string)($_SERVER['REMOTE_ADDR'] ?? ''), 0, 45)]); }
function csrf_token(): string { if (empty($_SESSION['csrf'])) $_SESSION['csrf'] = bin2hex(random_bytes(32)); return $_SESSION['csrf']; }
function require_csrf(): void { if (!hash_equals($_SESSION['csrf'] ?? '', (string)($_POST['csrf'] ?? ''))) json_response(['success' => false, 'message' => 'Invalid request token.'], 419); }
function require_role(string $role): void { if (empty($_SESSION['user']) || $_SESSION['user']['role'] !== $role) json_response(['success' => false, 'message' => 'You are not authorised for this action.'], 403); }
