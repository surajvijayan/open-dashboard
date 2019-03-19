<?php
global $ROOT,$panes;
$panes = array();
#ROOT = "http://104.62.26.124/open-dashboard";
#$ROOT = "http://customer1.testone-234200.appspot.com";
$ROOT = "https://customer1.sispara-analytics.com";
$panes = array(
				1 => array(
					"name" => "sample",
					"header" => "Sample Widgets",
                    "config" => "dashboard_sample.inc"
                )
			);
?>
