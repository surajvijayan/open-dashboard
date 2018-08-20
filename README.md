# Open-dashboard
A dashboard framework to deploy chart and grid widgets. Light-weight and very flexible model. Javascript charting library: Amcharts and Javascript grid library: free-jqgrid have been integrated. Widgets fetch JSON formatted data from webservice.
# Screenshots
![Optional Text](../master/docs/image1.png)
#Configuration
Open-Dashboard is a collection of chart or grid type widgets organized under different panes. Each pane has its own configuration file named: <pane_name>.inc. Widget configuration file in <pane_name>.inc is a PHP two dimentional array of wiget structures. Each row maps to a row of widgets displayed by Open-Dashboard.
#Sample pane inc file: dasnboard_sample.inc
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
#Widget configuration

Widget could of Chart or Grid type. The following are the widget configuration options:
##TYPE
should be 'chart' or 'grid'. Open-Dashboard integrates with Amcharts Javascript charts and free-jqgrid grids.
##SIZE
Defines the size of widget window. It should be 'big','medium' or 'small'.
##NAME
The exact name of the wiget. Widget of type 'chart' should have a javascript file named: <widget_name>.js under dashboard/charts directory. Widget of type 'grid' should have a javascript file named: <widget_name>.js under dashboard/grids directory.
##HEADING
This should be set only for  widgets of type 'chart'. This value will be displayed as heading of chart widget. HEADING should be set to null for widgets of type 'grid'.
##INPUT_FORM
Open-Dashboard supports plug-and-play type forms that could be attached to any widget. Form takes in input for widgets,calls webservice attached to that widget,extracts JSON data from webservice and then refreshes widget with updated JSON data. Refer sample forms: region_input_form,gdp_input_form,date_input_form and date_range_input_form in dashboard.php file.
##INPUT_FORM_ARGS
An array of parameters passed to form defined in widget configuration. These values are used when Open-Dashboard initially loads widgets.

#Widget Javascript file
Every widget should have a Javascript file named: <widget_name>.js in chart or grid directory under ROOT/dashboard. This file should have two functions named:
1. <widget_name>__process(ROOT,params,header,div)
2. <widget_name>__submit(ROOT,div,form_id,click_id)

Please refer to sample wiget Javascript files under dashboard/charts and dashboards/grids directories. Please note, widget name is <widget_name>.js file name should exactly match the name configured in <pane_name>.inc file.

#Runtime Javascript files

Open-Dashboard needs some runtime Javascript files to be generated once Widget Javascript files and <pane_name>.inc files are generated.

