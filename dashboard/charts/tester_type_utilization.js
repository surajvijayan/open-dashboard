
var timer;
function tester_type_utilization_process(ROOT,params,header,div,form_id,limit)
{
  var chart,chartData,total,start_page,date;
  var jsonp_url = ROOT + '/dashboard/jsonp_backend.php';
  var data_array = [];
  var graph_array = [];
  var guide_array = [];
  if(limit == '' || limit == null)
    limit = 15;
  var date = $(form_id+" input[name=from_date]").val();
  $('#'+div+'_curtain').show();
  $.getJSON(jsonp_url+'?'+params+'&pageSize='+limit+'&jsoncallback=?',function(data){
  chartData = data;
  total = chartData.total;
  if(total == 0 || chartData.items.length == 0)
  {
    $('#'+div).html('<h2 class=error>No data is available!<h2>');
    $('#'+div+'_curtain').hide();
    return(false);
  }
  transpose(chartData.items,data_array,graph_array,guide_array); 
  start_page = Math.floor(chartData.page);

  chart = AmCharts.makeChart(div, {
  "type": "serial",
  "theme": "dark",
  "autoMarginOffset": 20,
  "dataProvider": data_array,
  "valueAxes": [{
  	"guides": guide_array,
    "stackType": "regular",
    "position": "left",
    "title": "Total Testers/Tester Type ",
  },
  ],
  "startDuration": 1,
  "graphs": graph_array,
  "plotAreaFillAlphas": 0.1,
  "depth3D": 30,
  "angle": 30,
  "categoryField": "date",
  "categoryAxis": {
    "labelOffset": 15,
    "gridPosition": "start",
    "tickPosition": "start"  
  },
  "export": {
    "enabled": true,
    "position": "top-right"
  },
  "legend": {
	"autoMargins": false,
    "borderAlpha": 0.2,
    "equalWidths": false,
    "horizontalGap": 10,
    "markerSize": 10,
    "useGraphSettings": true,
    "valueAlign": "left",
    "valueWidth": 0
    },
	"chartCursor": {
    "cursorPosition": "mouse",
    "valueLineBalloonEnabled": true,
    "valueLineEnabled": true
  }
});
}).done(function(data)
{
    // setting pagination
    $(form_id+'_paging').pagination(
    {
         dataSource: jsonp_url+'?'+params+'&from_date='+date+'&limit='+limit+'&jsoncallback=?',
         locator: 'items',
         totalNumber: total,
         pageNumber: start_page,
         showPageNumbers: false,
         showNavigator: true,
         pageSize: limit,
         triggerPagingOnInit: true,
         callback: function(response, pagination)
         {
            if(response.length == 0)
            {
                $('#'+div).html('<h2 class=error>No data is available!<h2>');
                $('#'+div+'_curtain').hide();
                return(false);
            }
  			transpose(response,data_array,graph_array,guide_array); 
            chart.dataProvider = data_array;
            chart.validateData();
            $('#'+div+'_curtain').hide();
            $(form_id+" input[name=from_date]").val(response[0].DATE);
         }
    });
    // add some hooks
    $(form_id+'_paging').addHook('beforeNextOnClick', function()
    {
        $('#'+div+'_curtain').show();
    });
    $(form_id+'_paging').addHook('beforePreviousOnClick', function()
    {
        $('#'+div+'_curtain').show();
    });
    $('#'+div+'_curtain').hide();
    $(form_id+'_paging').pagination('enable');
    $(form_id+'_paging').pagination('show');
});
}
/*************************************************************************************************/

function tester_type_utilization_submit(ROOT,div,form_id,click_id)
{
    var webservice;
    var date,device,test_code,limit,consigned;
    $(form_id).submit(
    function(e)
    {
        e.preventDefault();
        
        date = $(form_id+' input[name=from_date]').val() || '';
        var sites = $(form_id+' select[name=site] option:selected').map(function(){ return this.value }).get();
        base_die = $(form_id+' input[name=base_die]').val() || '';
        device = $(form_id+' input[name=device_input]').val() || '';
        test_code = $(form_id+' select[name=test_code] option:selected').val() || '';
        consigned = $(form_id+' select[name=consigned] option:selected').val() || '';
        limit = $(form_id+' input[name=limit]').val() || '';
        $('#'+div).empty();
        webservice = 'service=get_tester_usage&from_date='+date+'&site='+sites+'&test_code='+test_code+'&consigned='+consigned;
        tester_type_utilization_process(ROOT,webservice,'Tester Usage from:'+date+' @ '+sites,div,form_id,limit);
        $(form_id+' #play').change(function()
        {
        if($(form_id+' input[id=play]').prop('checked'))
        {
            timer = setTimeout(function tick()
            {
				sel_page = $(form_id+'_paging').pagination('getSelectedPageNum');
				tot_pages = $(form_id+'_paging').pagination('getTotalPage');
				if(sel_page < tot_pages)
					$(form_id+'_paging').pagination('next');
				clearTimeout(timer);
				timer = setTimeout(tick, 2000);
            }, 2000);
        }
        else
            clearTimeout(timer);
       });
        $('#'+div).show();
    });
    $(click_id).click(
    function()
    {
        $('#'+div).slideToggle();
        $(click_id).toggleClass('fa-chevron-circle-down fa-chevron-circle-up fa-2x fa-2x');
    });
}
/*************************************************************************************************/

function TesterType(name,site,tester_type,used_testers,total_testers,tester_use_percentage)
{
	this.name = name,
	this.site = site;
	this.tester_type = tester_type,
	this.used_testers = used_testers;
	this.total_testers = total_testers;
	this.tester_use_percentage = tester_use_percentage;
}
/*************************************************************************************************/

TesterType.prototype.toString = function TesterTypetoString() 
{
  var ret = this.name;
  return ret;
}
/*************************************************************************************************/

function transpose(chartData,data_array,graph_array,guide_array)
{
	// looping over JSON data received from webservice and flattening it out to a transposed array
	// input: [{
	//			"SITE":"AMDP",
	//			"DATE":"2018-09-01",
	//			"TEST_CODE":"FT",
	//			"TESTER_TYPE":"UFLEX PA FCZ1024",
	// 			"CONSIGNED_FLAG":"0",
	//			"TOTAL_TESTERS":"7",
	//			"STDF_TOTAL":"5",
	//			"BIN1_TOTAL":"4262",
	//			"TOTAL_UNITS":"5992",
	//			},
	//			{
	//			"SITE":"AMDP",
	//			"DATE":"2018-09-01",
	//			"TEST_CODE":"FT",
	//			"TESTER_TYPE":"UFLEX PA",
	// 			"CONSIGNED_FLAG":"0",
	//			"TOTAL_TESTERS":"7",
	//			"STDF_TOTAL":"5",
	//			"BIN1_TOTAL":"4262",
	//			"TOTAL_UNITS":"5992",
	//			"TESTER_USAGE_DURATION":"13:18:30"},
	//			}, ..
	// output: [{
	//			"DATE":"2018-09-01",
	//			"AMDP_TEST_CODE":"FT",
	//			"AMDP_TESTER_TYPE":"UFLEX PA FCZ1024",
	// 			"AMDP_TESTER_TYPE_CONSIGNED_FLAG":"0",
	//			"AMDP_TESTER_TYPE_TOTAL_TESTERS":"7",
	//			"AMDP_TESTER_TYPE_STDF_TOTAL":"5",
	//			"AMDP_TESTER_TYPE_BIN1_TOTAL":"4262",
	//			"AMDP_TESTER_TYPE_TOTAL_UNITS":"5992",
	//			"AMDP_TESTER_TYPE_TESTER_USAGE_DURATION":"13:18:30",
	//			},..
	var defineProp = function(obj,key,value)
	{
   		var config =
		{
    		value: value,
    		writable: true,
    		enumerable: true,
   			configurable: true
  		};
 		Object.defineProperty(obj,key,config);
	};
	var uniq_sites_tester_types = new Map();
	var sites_tester_cnt = new Map();
	data_array.length = 0;
	graph_array.length = 0;
	guide_array.length = 0;
	ldate = chartData[0].DATE;
	var val = 0;
	var	obj = new Object();
	defineProp(obj,"label",0);
	for(var i = 0; i < chartData.length; i++) 
	{
		if(ldate != chartData[i].DATE)
        {
			once = false;
            data_array.push(obj);
            obj = new Object();
            defineProp(obj,"label",0);
        }
		var site_tester_type = chartData[i].SITE + "_" + chartData[i].TESTER_TYPE + "_TESTER_TYPE";
		var consigned_cnt = chartData[i].SITE + "_" + chartData[i].TESTER_TYPE + "_CONSIGNED_USED_COUNT";
		var used_testers  = chartData[i].SITE + "_" + chartData[i].TESTER_TYPE + "_USED_TESTERS";
		var total_testers  = chartData[i].SITE + "_" + chartData[i].TESTER_TYPE + "_TOTAL_TESTERS";
		var stdf_total     = chartData[i].SITE + "_" + chartData[i].TESTER_TYPE + "_STDF_TOTAL";
		var tester_usage   = chartData[i].SITE + "_" + chartData[i].TESTER_TYPE + "_TESTER_USAGE_DURATION";
		var bin1_total     = chartData[i].SITE + "_" + chartData[i].TESTER_TYPE + "_BIN1_TOTAL";
		var total_units    = chartData[i].SITE + "_" + chartData[i].TESTER_TYPE + "_TOTAL_UNITS";
		var tester_use_percentage = chartData[i].SITE + "_" + chartData[i].TESTER_TYPE + "_TESTER_USAGE_PERCENT";
		defineProp(obj,"date",chartData[i].DATE);
		defineProp(obj,consigned_cnt,chartData[i].CONSIGNED_USED_COUNT);
		defineProp(obj,used_testers,chartData[i].USED_TESTERS);
		defineProp(obj,total_testers,chartData[i].TOTAL_TESTERS);
		defineProp(obj,stdf_total,chartData[i].STDF_TOTAL);
		defineProp(obj,tester_usage,chartData[i].TESTER_USAGE_DURATION);
		defineProp(obj,bin1_total,chartData[i].BIN1_TOTAL);
		defineProp(obj,total_units,chartData[i].TOTAL_UNITS);
		defineProp(obj,tester_use_percentage,chartData[i].TESTER_USAGE_PERCENT);
		defineProp(obj,chartData[i].SITE + "_TOTAL_TESTERS",chartData[i].SITE_TESTER_CNT);
		ldate = chartData[i].DATE;
		sites_tester_cnt.set(chartData[i].SITE,chartData[i].SITE_TESTER_CNT);
		uniq_sites_tester_types.set(site_tester_type,new TesterType(site_tester_type,chartData[i].SITE,chartData[i].TESTER_TYPE,used_testers,chartData[i].SITE_TESTER_CNT,tester_use_percentage));
	}
	var first = true;
	let mapToArray = Array.from(uniq_sites_tester_types.values());
	/*var uniq_ttypes = mapToArray.filter(function (el) 
	{
  		return el.date = chartData[i].DATE;
	});
	*/
	let uniq_ttypes = [...new Set(mapToArray.map(item => item.tester_type))];
	let uniq_sites = [...new Set(mapToArray.map(item => item.site))];
	for (j = 0; j < uniq_sites.length;j++)
	{
		if(first == false) // Start a new column/stack
		{
			graph_array.push( 
			{
				"newStack": true,
				//"numberFormatter": {precision:-1, decimalSeparator:'.', thousandsSeparator:','},
				"fillAlphas": 0,
      			"lineAlpha": 0,
      			"title": uniq_sites[j],
      			"type": "column",
      			"valueField": "label",
				"color": "#FFFFFF",
      			"showAllValueLabels": true,
				"showBalloon": false,
      			"labelText": "\n[[title]]"
   			});
		}
		else
		{
			first = false;
			graph_array.push(
    		{
		        "fillAlphas": 0,
       			"lineAlpha": 0,
				"title": uniq_sites[j],
				"type": "column",
				"valueField": "label",
				"showAllValueLabels": true,
				"showBalloon": false,
				"color": "#FFFFFF",
				"labelText": "\n[[title]]"
			});
		}
		for (i = 0; i < uniq_ttypes.length;i++)
		{
			cum_testers =  uniq_sites[j] + "_TOTAL_TESTERS";
			fld = uniq_sites[j] + "_" +  uniq_ttypes[i] + "_USED_TESTERS";
			total_testers = uniq_sites[j] + "_" + uniq_ttypes[i] + "_TOTAL_TESTERS";
			stdf_cnt = uniq_sites[j] + "_" + uniq_ttypes[i] + "_STDF_TOTAL";
			bin1_cnt = uniq_sites[j] + "_" + uniq_ttypes[i] + "_BIN1_TOTAL";
			usage_durn = uniq_sites[j] + "_" + uniq_ttypes[i] + "_TESTER_USAGE_DURATION";
			tester_use_percentage = uniq_sites[j] + "_" + uniq_ttypes[i] + "_TESTER_USAGE_PERCENT";
			balloonText = "<table><tr><td align=left>Used Testers</td><td align=left>[[value]]</td></tr>";
			balloonText += "<tr><td align=left>Total Testers</td><td align=left>[[" + total_testers + "]]</td></tr>";
			balloonText += "<tr><td align=left>Tester Usage % [hh:mm:ss]</td><td align=left>[[" + tester_use_percentage + "]]%</td></tr>";
			balloonText += "<tr><td align=left>Tester Type</td><td align=left>" + uniq_ttypes[i] + "</td></tr>";
			balloonText += "<tr><td align=left>Total Usage [hh:mm:ss]</td><td align=left>[[" + usage_durn + "]]</td></tr>";
			balloonText += "<tr><td align=left>STDF Count</td><td align=left>[[" + stdf_cnt + "]]</td></tr>";
			balloonText += "<tr><td align=left>BIN1 Count</td><td align=left>[[" + bin1_cnt + "]]</td></tr></table>";
			graph_array.push( 
			{
					"numberFormatter": {precision:-1, decimalSeparator:'.', thousandsSeparator:','},
					"fillAlphas": 0.9,
      				"lineAlpha": 0.2,
					"labelText":  uniq_ttypes[i],
					"showAllValueLabels": false,
					"color": "#FFFFFF",
      				"title": uniq_ttypes[i],
      				"type": "column",
      				"valueField": fld,
					"balloonText": balloonText,
					balloonFunction: function(e) 
					{
						var value = e.graph.chart.dataProvider[e.index][e.graph.valueField];
						if (!value || parseInt(value) == 0)
						{
							return "";
						}
						return e.graph.chart.formatString(e.graph.balloonText, e, true);
					},
					"legendValueText": uniq_ttypes[i]
   			});
		}
		graph_array.push( 
		{
        "bulletBorderAlpha": 0,
        "bulletColor": "#FFFFFF",
        "useLineColorForBulletBorder": false,
        "fillAlphas": 0,
        "lineThickness": 0,
        "lineAlpha": 0,
        "bulletSize": 0,
        "title": "Max",
        "valueField": cum_testers
		});
		guide_array.push(
		{
			"value": sites_tester_cnt.get(uniq_sites[j]),
			"inside": true,
       		"lineAlpha": 0.8,
			"color": "#FFFF00",
       		"label": "Total Testers at site:"+ uniq_sites[j]+':'+sites_tester_cnt.get(uniq_sites[j]),
        	"position": "right",
			"expand": true
   		});
    }
}
/*************************************************************************************************/
