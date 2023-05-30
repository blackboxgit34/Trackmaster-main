<?php

/* JPEGCam Test Script */
/* Receives JPEG webcam submission and saves to local file. */
/* Make sure your directory has permission to write files as your web server user! */

// snapshot filename 
//$filename = date('YmdHis') . '.jpg';
$filename = 'webcam_snapshot_file' . '.jpg';

// relative path to "js/lib/webcam"
$upload_folder = '../../../webcam_upload_folder/';

//** uncoment folowing lines to save snapshot to local file
//$result = file_put_contents( $upload_folder.$filename, file_get_contents('php://input') );
//if (!$result) {
//	print "ERROR: Failed to write data to $upload_folder.$filename, check permissions\n";
//	exit();
//}

// upload path
$_SERVER['PHP_SELF'] = str_replace('js/lib/webcam','webcam_upload_folder',$_SERVER['PHP_SELF']);
$upload_url = $_SERVER['HTTP_HOST'].dirname($_SERVER['PHP_SELF']);

$url = 'http://' . $upload_url . '/' . $filename;
print "$url\n";

?>
