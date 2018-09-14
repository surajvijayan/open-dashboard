<?php
global $ROOT,$panes;
$panes = array();
$ROOT = "http://104.62.26.124/xyz";
$panes = array(
				1 => array(
					"name" => "sample",
					"header" => "Sample Widgets",
					"config" => "dashboard_sample.inc"
				),
				2 => array(
					"name" => "yield",
					"header" => "Yield Analysis",
					"config" => "dashboard_yield.inc"
				)
			);
?>
