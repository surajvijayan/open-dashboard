
function get_country_fact_sheets_process(ROOT,params,header,div)
{
	var url,chartData;

	url = ROOT;
	$('#'+div+'_curtain').show();
	$.get(url,params, function (data) 
	{
		chartData = $.parseJSON(JSON.stringify(data));   //parse JSON
		chart = new AmCharts.AmPieChart();
		chart.pathToImages = ROOT + "webservices/amcharts/images/";
		chart.dataProvider = chartData;
		chart.categoryField = "name";
		chart.startDuration = 1;
		chart.sequencedAnimation = true;
		chart["export"] = {"enabled": true};
		chart.type = "pie";
		chart.radius = 190;
		chart.angle = 45;
		chart.outlineAlpha = 0.4;
		chart.depth3D = 15;
		chart.valueField = "population";
		chart.titleField = "name",
		chart.startDuration = 1;
		chart.usePrefixes = true;
		chart.prefixesOfBigNumbers = [{number:1e+6,prefix:"M"}, {number:1e+9,prefix:"B"},{number:1e+12,prefix:"T"}];
		chart.marginTop = 80;
		chart.balloonText = "<table>";
		chart.balloonText += "<tr><th align=left>Country</th><td align=left>[[name]]</td></tr>";
		chart.balloonText += "<tr><th align=left>Capital</th><td align=left>[[capital]]</td></tr>";
		chart.balloonText += "<tr><th align=left>Population</th><td align=left>[[value]]</td></tr>";
		chart.balloonText += "</table>";

/*		var legend = new AmCharts.AmLegend();
		legend.valueAlign = "left";
		legend.valueWidth = 35;
*/
		chart.addTitle(header);
		//chart.addLegend(legend, "legenddiv");
		chart.write(div);
		}).done(function( data ) 
		{
			$('#'+div+'_curtain').hide();
		});
}
/***************************************************************************************************/

function get_country_fact_sheets_submit(ROOT,div,form_id,click_id)
{
	var region,webservice;
	$(form_id).submit(
		function(e)
		{
			e.preventDefault();
		      
		    region = $(form_id+' select[name=region] option:selected').val();
		    name = $(form_id+' select[name=region] option:selected').text();
		    header = 'Countries in region:'+name+' ('+region+')\n';
		    $('#'+div).empty();
		    webservice = '?fields=name;capital;population';
		    get_country_fact_sheets_process('https://restcountries.eu/rest/v2/regionalbloc/'+region+webservice,'',header,div);
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
