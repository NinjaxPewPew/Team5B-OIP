<?php

  // Replace contact@example.com with your real receiving email address (or an admin email to notify about new posts)
  $receiving_email_address = 'admin@example.com';

  if( file_exists($php_email_form = '../assets/vendor/php-email-form/php-email-form.php' )) {
    include( $php_email_form );
  } else {
    die( 'Unable to load the "PHP Email Form" Library!');
  }

  $post = new PHP_Email_Form;
  $post->ajax = true;

  $post->to = $receiving_email_address;
  $post->from_name = $_POST['name'];
  $post->from_email = $_POST['email'];
  $post->subject = 'New Forum Post: ' . $_POST['subject'];

  // Uncomment below code if you want to use SMTP to send emails. You need to enter your correct SMTP credentials
  /*
  $post->smtp = array(
    'host' => 'example.com',
    'username' => 'example',
    'password' => 'pass',
    'port' => '587'
  );
  */

  $post->add_message($_POST['name'], 'Posted By');
  $post->add_message($_POST['email'], 'Email');
  $post->add_message($_POST['message'], 'Post Content', 10);

  // Handling file uploads remains unchanged as before
  $upload_dir = 'uploads/';
  $allowed_extensions = array('jpg', 'jpeg', 'png', 'gif', 'mp4');
  $max_file_size = 5000000;

  if(isset($_FILES['media']) && $_FILES['media']['error'] == 0) {
    $extension = pathinfo($_FILES['media']['name'], PATHINFO_EXTENSION);

    if(!in_array(strtolower($extension), $allowed_extensions) || $_FILES['media']['size'] > $max_file_size) {
      die('Invalid file upload!');
    }

    $filename = uniqid() . '.' . $extension;
    if(move_uploaded_file($_FILES['media']['tmp_name'], $upload_dir . $filename)) {
      $uploaded_file_path = $upload_dir . $filename;
      $post->add_message('File attached: ' . $uploaded_file_path, 'Attachment');
    } else {
      die('Error uploading file!');
    }
  }

  echo $post->send();

?>
