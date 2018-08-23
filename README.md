# Open-Dashboard
A PHP dashboard framework to deploy chart and grid widgets. Light-weight and very flexible model. Javascript charting library: Amcharts and Javascript grid library: free-jqgrid have been integrated. Widgets fetch JSON formatted data from webservice and render sleek charts and grids. Jquery,AmCharts,free-jqgrid and font-awesome are the primary client side components. Here are the relevant links:
+ amCharts: https://www.amcharts.com/javascript-charts
+ free-jqgrid: https://free-jqgrid.github.io
+ Font-awesome: https://fontawesome.com
+ jQuery: https://jquery.com
+ jQuery UI: https://jqueryui.com
# Screenshots
![image1](../master/docs/image1.png)
![image2](../master/docs/image2.png)
# Installation
Here are the quick steps to get going within minutes:
1. Clone git repository: git clone https://gist.github.com/109311bb0361f32d87a2.git open-dashboard under web server DOCUMENT ROOT
2. Enable PHP support on your web server. PHP support is built-in for most linux distributions
3. Open-Dashboard uses PHP command line utility to generate few files. Install php-cli for your OS. Refer: http://www.php-cli.com/ for more information
4. Edit open-dashboard/vars.inc file and set ROOT to point to open-dashboard directory
5. Ensure Internet access is enabled on your web server
5. Start web server. Try accessing ROOT/dashboard/dashboard_sample.php from you browser
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
Name of the pane.
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

# Sample Chart widget Javascript
```js
function country_gdp_process(ROOT,params,header,div)
{
    var chart,url,chartData;

    url = ROOT;
    $('#'+div+'_curtain').show();
    $.get(url,params, function (data)
    {
        chartData = $.parseJSON(JSON.stringify(data));   //parse JSON
        var valueAxis = new AmCharts.ValueAxis();
        valueAxis.dashLength = 5;
        valueAxis.title = "GDP (current US$)";
        valueAxis.axisAlpha = 0;

        var graph1 = new AmCharts.AmGraph();
        graph1.numberFormatter = {precision:-1, decimalSeparator:'.', thousandsSeparator:','};
        graph1.valueField = "value";
        graph1.type = "column";
        graph1.fillAlphas = 0.6;
        graph1.bullet = "round";
        graph1.balloonText = "<table>";
        graph1.balloonText += "<tr><th align=left>Country</th><td align=left>[[countryiso3code]]</td></tr>";
        graph1.balloonText += "<tr><th align=left>GDP</th><td align=left>[[value]]</td></tr>";
        graph1.balloonText += "<tr><th align=left>Year</th><td align=left>[[date]]</td></tr>";
        graph1.balloonText += "</table>";
        graph1.title = "Country";
        graph1.bulletBorderThickness = 2;
        graph1.lineThickness = 1;
        graph1.lineAlpha = 0.5;

        var legend = new AmCharts.AmLegend();
        legend.valueAlign = "left";
        legend.valueWidth = 35;
        legend.valueText = "[[countryiso3code]]:[[value]]";

        var chartCursor = new AmCharts.ChartCursor();
        chart = new AmCharts.AmSerialChart();
        chart.usePrefixes = true;
        chart.prefixesOfBigNumbers = [{number:1e+6,prefix:"M"}, {number:1e+9,prefix:"B"},{number:1e+12,prefix:"T"}];
        chart.numberFormatter = {precision:-1, decimalSeparator:'.', thousandsSeparator:','};
        chart.pathToImages = ROOT + "webservices/amcharts/images/";
        chart.dataProvider = chartData[1];
        chart.categoryField = "countryiso3code";
        chart.startDuration = 1;
        chart.sequencedAnimation = false;
        chart.categoryAxis = { labelRotation: "45", centerLabels: true }
        chart["export"] = {"enabled": true};
        chart.addValueAxis(valueAxis);
        chart.addGraph(graph1);
        chart.addTitle(header);
        chart.addLegend(legend, "legenddiv");
        chart.addChartCursor(chartCursor);

        chart.write(div);
    }).done(function( data )
    {
        $('#'+div+'_curtain').hide();
    });
}
/***************************************************************************************************/

function country_gdp_submit(ROOT,div,form_id,click_id)
{
    var countries,c_codes,fyear,webservice;
    $(form_id).submit(
        function(e)
        {
            e.preventDefault();
            countries = $(form_id+' select[name=country] option:selected').map(function(){ return this.value }).get().join(';');
            c_codes = $(form_id+' select[name=country] option:selected').map(function(){ return this.value }).get().join(';');
            fyear = $(form_id+' select[name=fyear] option:selected').val();
            header = 'GDP for Countries:'+countries+' in year:'+fyear;
            $('#'+div).empty();
            webservice = countries+'/indicators/NY.GDP.MKTP.CD?date='+fyear+'&format=json';
            country_gdp_process('https://api.worldbank.org/v2/countries/'+webservice,'',header,div);
            $('#'+div).show();
        });
        $(click_id).click(
            function()
            {
                $('#'+div).slideToggle();
                $(click_id).toggleClass('fa-chevron-circle-down fa-chevron-circle-up fa-2x fa-2x');
            });
}
/***************************************************************************************************/
```
``` Sample  Grid widget Javascript
function countries_data_process(ROOT,service,flag,table_id)
{
    var url;
    var region = $('#form_countries_data select[name=region] option:selected').val();
    var title = 'Countries in region:'+region;

    var url = ROOT;
    jQuery('#'+table_id).jqGrid({
    url:url,
    loadonce: true,
    mtype: 'GET',
    datatype: 'json',
    colNames:[
                'Name',
                'Region',
                'Subregion',
                'Capital',
                'Population',
                'Area',
                'GINI Index',
                'Flag'
                //'borders'
            ],
    colModel:[
        {name:'name',width:200},
        {name:'region',width:200},
        {name:'subregion',width:200},
        {name:'capital',width:200},
        {name:'population',width:130,template: "integer"},
        {name:'area',width:130,template: "integer",formatoptions: { suffix: " sq.km."}},
        {name:'gini',width:80,template: "number",formatoptions:{decimalPlaces: 1}},
        {name:'flag',width:230,formatter:'link'}
    ],
    iconSet: "fontAwesome",
    rowNum:20,
    rowList:[10,20,30],
    pager: true,
    viewrecords: true,
    sortorder: "desc",
    caption: title,
    hiddengrid: flag,
    shrinkToFit: false,
    subGrid: false
    }).jqGrid("navGrid", {refresh:false,edit: false,add: false,del: false,search: false,view: false});
}
/*****************************************************************************************/

function countries_data_submit(ROOT,div,form_id)
{
    var region,webservice;
    $(form_id).submit(
        function(e)
        {
            e.preventDefault();
            region = $(form_id+' select[name=region] option:selected').val();
            name = $(form_id+' select[name=region] option:selected').text();
            webservice = '?fields=name;capital;population;area;flag;region;subregion;gini';
            $('#'+div).GridUnload();
            countries_data_process('https://restcountries.eu/rest/v2/regionalbloc/'+region+webservice,'test',false,div);
            $('#'+div).show();
        });
}
/*****************************************************************************************/
```
# Runtime Javascript and PHP files

Open-Dashboard needs few runtime Javascript and startup PHP files to be generated once Widget Javascript files and &lt;pane_name&gt;.inc files are generated. The folllowing are the files:
1. &lt;pane_name&gt;_widgets.js
2. dashboard_&lt;pane_name&gt;.js
3. dashboard_&lt;pane_name&gt;.php

All three files should reside under ROOT/dashoard/ directory. &lt;pane_name&gt;_widgets.js will have the list of all Javascript widgets configured within a <pane_name>.inc. sample_widgets.js is shown below:
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
Three runtime files are generated for each pane of Open-Dashborad, they are: 
1. &lt;pane_name&gt;_widgets.js
2. dashboard_&lt;pane_name&gt;.js
3. dashboard_&lt;pane_name&gt;.php
All three files are generated via running PHP command-line utility: ROOT/dashboard/dashboard_create_php_js.php. All runtime files should be generated under ROOT/dashboard directory. ROOT/dashboard/dashboard_create_php_js.php takes the following arguments: 
+ $php dashboard_create_js.php 
    - Usage: dashboard_create_js.php [js|php|widgets]
### Generating  dashboard_&lt;pane&gt;.js files
Run the command: $php dashboard_create_js.php js
### Generating dashboard_&lt;pane&gt;.php files
Run the command: $php dashboard_create_js.php php 
### Generating &lt;pane_name&gt;_widgets.js files
Run the command: $php dashboard_create_js.php widgets
# Author
Suraj Vijayan <suraj.vijayan1966@gmail.com>
# License
This project is licensed under GPL-3.0-or-later license - see ![LICENSE.md](../master/LICENSE.md) file for details.
