
/*****************************************************************************************/

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
