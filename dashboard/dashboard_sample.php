<?php
/*
	Open-Dashboard: Designed by Suraj Vijayan - First Release: August 2018
*/
header("Access-Control-Allow-Origin: *");
session_start();
include_once('../vars.inc');
require_once('./dashboard.php');
require_once('./dashboard_sample.inc');

print_header('dashboard_sample.js','sample_widgets.js');
// Dashboard Menu stuff..
dashboard_header($ROOT,'Sample Widgets');
show_widgets($widgets_array);
dashboard_footer($ROOT);
?>