<?php
global $ROOT,$planes;
$planes = array();
$ROOT = "https://bbportal-dev.broadcom.com/dashboard";
$planes = array(
				1 => array(
					"name" => "sample",
					"header" => "Sample Widgets",
					"config" => "dashboard_sample.inc"
				),
				2 => array(
					"name" => "sample2",
					"header" => "Sample Widgets2",
					"config" => "dashboard_sample2.inc"
				)
			);
?>
