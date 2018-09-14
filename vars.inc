<?php
global $ROOT,$panes;
$panes = array();
<<<<<<< HEAD
$ROOT = "http://104.62.26.124/xyz";
=======
$ROOT = "http://127.0.0.1/dashboard";
>>>>>>> 55a9824c761f780cbebd60e38f4dde763bf9c569
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
