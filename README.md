# Open-dashboard
A PHP dashboard framework to deploy chart and grid widgets. Light-weight and very flexible model. Javascript charting library: Amcharts and Javascript grid library: free-jqgrid have been integrated. Widgets fetch JSON formatted data from webservice and render sleek charts and grids. Jquery,AmCharts,free-jqgrid and font-awesome are the primary client side components. Here are the relevant links:
<li>amCharts: https://www.amcharts.com/javascript-charts/
<li>free-jqgrid: https://free-jqgrid.github.io/
<li>Font-awesome: https://fontawesome.com/
<li>jQuery: https://jquery.com/
<li>jQuery UI: https://jqueryui.com/
# Screenshots
![Optional Text](../master/docs/image1.png)
![Optional Text](../master/docs/image2.png)
# Configuration
Open-Dashboard widgets are organized under different panes. Each pane has its own configuration file named: &lt;pane_name&gt;.inc. Widgets configuration in &lt;pane_name&gt;.inc is a PHP two dimentional array of widget structures. Each row maps to a row of widgets displayed by Open-Dashboard. Another configuration file: vars.inc is the master configuration file that has details on all panes. This ReadeMe refers to ROOT as the base location where Open-Dashboard is installed under web server. Master configuration file:vars.inc should reside under ROOT directory and all pane configuration files should reside under ROOT/dashboard directory.
# Sample Master configuration file:vars.inc
```php
<?php
global $ROOT,$panes;
$panes = array();
$ROOT = "https://127.0.0.1/open-dashboard";
$panes = array(
				1 => array(
					"name" => "sample",
					"header" => "Sample Widgets",
					"config" => "dashboard_sample.inc"
				)
			);
?>
```
## NAME
This is the of the pane.
## HEADER
Text displayed to identify a pane.
## CONFIG
The configuration file for the pane.
# Sample pane configuration file:dashboard_sample.inc
```php
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
            "HEADING" => null,
            "REFRESH_SECS" => "0",
            "INPUT_FORM" => "COUNTRIES_REGION",
            "INPUT_FORM_ARGS" => array("SAARC")
        ),
    ),
);
?>
```
# Widgets configuration

Widgets could of Chart or Grid type. The following are the widget configuration options:
## TYPE
should be 'chart' or 'grid'. Open-Dashboard integrates with Amcharts Javascript charts and free-jqgrid grids.
## SIZE
Defines the size of widget window. It should be 'big','medium' or 'small'.
## NAME
The exact name of the widget. Widget of type 'chart' should have a javascript file named: &lt;widget_name&gt;.js under ROOT/dashboard/charts directory. Widget of type 'grid' should have a javascript file named: &lt;widget_name&gt;.js under ROOT/dashboard/grids directory.
## HEADING
This should be set only for  widgets of type 'chart'. This value will be displayed as heading of chart widget. HEADING should be set to null for widgets of type 'grid'.
## REFRESH_SECS
Seconds interval to refresh widget data. Open-Dashboard will invoke widget service after seconds configured here. A value of zero indicats data will never be auto-refreshed.
## INPUT_FORM
Open-Dashboard supports plug-and-play type forms that could be attached to any widget. Form takes in input for widgets,calls webservice attached to that widget,extracts JSON data from webservice and then refreshes widget with updated JSON data. Refer sample forms: region_input_form,gdp_input_form,date_input_form and date_range_input_form in ROOT/dashboard/dashboard.php file.

## INPUT_FORM_ARGS
An array of parameters passed to form defined in widget configuration. These values are used when Open-Dashboard initially loads widgets.

# Widget Javascript file
Every widget should have a Javascript file named: '&lt;widget_name&gt;'.js in chart or grid directory under ROOT/dashboard. This file should have two functions named:
1. &lt;widget_name&gt;_process(ROOT,params,header,div)
2. &lt;widget_name&gt;_submit(ROOT,div,form_id,click_id)

Please refer to sample widget Javascript files under ROOT/dashboard/charts and ROOT/dashboards/grids directories. Please note, widget name in &lt;widget_name&gt;.js file name should exactly match the name configured in &lt;pane_name&gt;.inc file.

# Runtime Javascript and PHP files

Open-Dashboard needs few runtime Javascript and startup PHP files to be generated once Widget Javascript files and &lt;pane_name&gt;.inc files are generated. The folllowing are the files:
1. &lt;pane_name&gt;_widgets.js
2. dashboard_&lt;pane_name&gt;.js
3. dashboard_&lt;pane_name&gt;.php

All three files should reside under dashoard/ directory. &lt;pane_name&gt;_widgets.js will have the list of all Javascript widgets configured within a <pane_name>.inc. sample_widgets.js is shown below:
```js
/* Suraj Vijayan 
 *
 * Got this from: http://chapter31.com/2006/12/07/including-js-files-from-within-js-files/
 *
 */
//this function includes all necessary js files for the application
function include(file)
{
	var script  = document.createElement('script');
	script.src  = file;
	script.type = 'text/javascript';
	script.defer = true;
	document.getElementsByTagName('head').item(0).appendChild(script);
}
include('charts/get_country_fact_sheets.js');
include('charts/country_area.js');
include('charts/country_gdp.js');
include('grids/countries_data.js');
```
## Generating runtime Javascript and PHP files
Three runtime files are generated for each pane of Open-Dashborad, they are: &lt;pane_name&gt;_widgets.js,dashboard_&lt;pane_name&gt;.js and dashboard_&lt;pane_name&gt;. All three files are generated via running PHP command-line utility: ROOT/dashboard/dashboard_create_php_js.php. All runtime files should be generated under dashboard directory. ROOT/dashboard/dashboard_create_php_js.php takes the following arguments:
<li>$php dashboard_create_js.php 
<br>
Usage: dashboard_create_js.php [js|php|widgets]
<br>
<br>
Please see below:
<br>
1. Generating  dashboard_&lt;pane&gt;.js files
<br>
	Run the command:
<li>$php dashboard_create_js.php js
<br>
<br>
2. Generating dashboard_&lt;pane&gt;.php files
<br>
	Run the command:
<li>$php dashboard_create_js.php php 
<br>
<br>
3. Generating &lt;pane_name&gt;_widgets.js files
<br>
	Run the command:
<li>$php dashboard_create_js.php widgets 

