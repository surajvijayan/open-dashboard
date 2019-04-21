
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
        {name:'name'},
        {name:'region'},
        {name:'subregion'},
        {name:'capital'},
		{name:'population',template: "integer"},
		{name:'area',template: "integer",formatoptions: { suffix: " sq.km."}},
		{name:'gini',template: "number",formatoptions:{decimalPlaces: 1}},
		{name:'flag',formatter:'link'}
    ],
	iconSet: "fontAwesome",
    rowNum:20,
    rowList:[10,20,30],
    pager: true,
    viewrecords: true,
    sortorder: "desc",
    caption: title,
    hiddengrid: flag,
    width: null,
    autowidth:true,
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
