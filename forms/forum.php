<?php
session_start();

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $name    = $_POST['name'] ?? '';
    $email   = $_POST['email'] ?? '';
    $subject = $_POST['subject'] ?? '';
    $message = $_POST['message'] ?? '';

    $errorMessage = '';  // To hold any error messages

    // Handle file upload if provided
    $media = $_FILES['media'] ?? null;
    if ($media && $media['error'] == 0) {
        $uploadsDir = 'uploads/';  // Make sure this directory exists and is writable
        $uploadedFilePath = $uploadsDir . basename($media['name']);

        if (!move_uploaded_file($media['tmp_name'], $uploadedFilePath)) {
            $errorMessage = "Error uploading the file.";
        }
    }

    if (empty($errorMessage)) {
        $_SESSION['successMessage'] = "Your post has been successfully submitted.";
    } else {
        echo $errorMessage;  // If there was an error, display it
    }
}

?>

<!-- Your HTML form here -->

<?php
if (isset($_SESSION['successMessage'])) {
    echo '<div class="alert alert-success">' . $_SESSION['successMessage'] . '</div>';
    unset($_SESSION['successMessage']);  // remove the message from session
}
?>
