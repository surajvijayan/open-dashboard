<?php

$widgets_array = array();
$widgets_array = array(
//Row 1
	array(
		array(
			"TYPE" => "chart",
			"SIZE" => "big",
			"NAME" => "get_country_fact_sheets",
			"HEADING" => "Regional Countries population",
			"REFRESH_SECS" => "0",
			"INPUT_FORM" => "COUNTRIES_REGION",
			"INPUT_FORM_ARGS" => array("SAARC")
		),
		array(
			"TYPE" => "chart",
			"SIZE" => "big",
			"NAME" => "country_area",
			"HEADING" => "Regional Countries area",
			"REFRESH_SECS" => "0",
			"INPUT_FORM" => "COUNTRIES_REGION",
			"INPUT_FORM_ARGS" => array("SAARC")
		),
		array(
			"TYPE" => "chart",
			"SIZE" => "big",
			"NAME" => "country_gdp",
			"HEADING" => "GDP of Countries",
			"REFRESH_SECS" => "0",
			"INPUT_FORM" => "GDP_REGIONS",
			"INPUT_FORM_ARGS" => array("0","USA","CAN","CHN","JPN","IND","GBR","DEU")
		),
	),
//Row 2
	array(
		array(
			"TYPE" => "grid",
			"SIZE" => "big",
			"NAME" => "countries_data",
			"HEADING" => "Regional Countries",
			"REFRESH_SECS" => "0",
			"INPUT_FORM" => "COUNTRIES_REGION",
			"INPUT_FORM_ARGS" => array("SAARC")
		),
	),
);
?>
