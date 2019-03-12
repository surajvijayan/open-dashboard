
function country_area_process(ROOT,params,header,div)
{
	var chart,url,chartData;

	url = ROOT;
	$('#'+div+'_curtain').show();
	$.get(url,params, function (data) 
	{
		chartData = $.parseJSON(JSON.stringify(data));   //parse JSON
		var valueAxis = new AmCharts.ValueAxis();
		valueAxis.dashLength = 5;
		valueAxis.title = "Area (sq. km.)";
		valueAxis.axisAlpha = 0;

		var graph1 = new AmCharts.AmGraph();
		graph1.numberFormatter = {precision:-1, decimalSeparator:'.', thousandsSeparator:','};
		graph1.valueField = "area";
		graph1.type = "column";
		graph1.fillAlphas = 0.6;
		graph1.bullet = "round";
		graph1.balloonText = "<table>";
		graph1.balloonText += "<tr><th align=left>Country</th><td align=left>[[name]]</td></tr>";
		graph1.balloonText += "<tr><th align=left>Capital</th><td align=left>[[capital]]</td></tr>";
		graph1.balloonText += "<tr><th align=left>Area</th><td align=left>[[value]] sq. km.</td></tr>";
		graph1.balloonText += "</table>";
		graph1.title = "Country";
		graph1.bulletBorderThickness = 2;
		graph1.lineThickness = 1;
		graph1.lineAlpha = 0.5;

		var legend = new AmCharts.AmLegend();
		legend.valueAlign = "left";
		legend.valueWidth = 35;
		//legend.valueText = "[[name]] : [[area]] sq. km.";
		legend.valueText = "[[category]] : [[value]] sq. km.";

		var chartCursor = new AmCharts.ChartCursor();
		chart = new AmCharts.AmSerialChart();
		chart.usePrefixes = true;
		chart.prefixesOfBigNumbers = [{number:1e+6,prefix:"M"}, {number:1e+9,prefix:"B"},{number:1e+12,prefix:"T"}];
        chart.numberFormatter = {precision:-1, decimalSeparator:'.', thousandsSeparator:','};
		chart.pathToImages = ROOT + "webservices/amcharts/images/";
		chart.dataProvider = chartData;
		chart.categoryField = "name";
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

function country_area_submit(ROOT,div,form_id,click_id)
{
	var region,webservice;
	$(form_id).submit(
		function(e)
		{
			e.preventDefault();
		      
		    region = $(form_id+' select[name=region] option:selected').val();
			name = $(form_id+' select[name=region] option:selected').text();
            header = 'Area of countries in region:'+name+' ('+region+')\n';
		    $('#'+div).empty();
		    webservice = '?fields=name;capital;area';
		    country_area_process('https://restcountries.eu/rest/v2/regionalbloc/'+region+webservice,'',header,div);
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
