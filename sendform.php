<?php
// ── CONTACT FORM HANDLER ──
// Upload this file to the SAME folder as contact.html on your SmartHost account.
// Change the $to address below to your real inbox before uploading.

header('Content-Type: text/plain');

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo "error";
    exit;
}

// ↓↓↓ CHANGE THIS to the email address you want messages sent to ↓↓↓
$to = "youremail@yourdomain.ie";

// Honeypot spam trap — if this hidden field is filled in, it's a bot
if (!empty($_POST['honeypot'])) {
    exit; // silently drop, don't tell the bot it failed
}

// Basic presence check
if (empty($_POST['name']) || empty($_POST['email']) || empty($_POST['message'])) {
    http_response_code(400);
    echo "error";
    exit;
}

$name    = strip_tags(trim($_POST['name']));
$email   = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
$message = strip_tags(trim($_POST['message']));

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo "error";
    exit;
}

$subject = "New message from Ladies Let's Talk Collective website";
$body    = "You received a new contact form submission:\n\n"
         . "Name: $name\n"
         . "Email: $email\n\n"
         . "Message:\n$message\n";

// Use a domain-based From address (helps avoid spam filters on some hosts)
$headers  = "From: no-reply@" . $_SERVER['HTTP_HOST'] . "\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

if (mail($to, $subject, $body, $headers)) {
    http_response_code(200);
    echo "success";
} else {
    http_response_code(500);
    echo "error";
}