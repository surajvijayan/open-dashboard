
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
            header = 'GDP for Countries:'+countries+'\n';
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
