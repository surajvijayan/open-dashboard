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
