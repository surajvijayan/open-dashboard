<?php

	if ($argc == 2) 
	{
  		if (php_sapi_name() == 'cli')
		{
			include_once($argv[1]); 
			print_top();
			print "\t" . '$("h4#date").text("Last Updated: "+Date());' . "\n";
			$no = 1;
			foreach ($widgets_array as $row)
			{
				foreach ($row as $widget)
				{
					$div = 'DIV_' . $no;
					if($widget["TYPE"] == "chart")
					{
						switch ($widget["SIZE"])
						{
							case 'small':
								print "\t" . "$('#" . $div . "').addClass('small_div_class');" . "\n";
								break;
							case 'medium':
								print "\t" . "$('#" . $div . "').addClass('med_div_class');" . "\n";
								break;
							case 'big':
								print "\t" . "$('#" . $div . "').addClass('big_div_class');" . "\n";
								break;
						}
						print "\t" . "$('#" . $div . "').show();" . "\n";
						print "\t" . $widget['NAME'] . "_" . "submit(ROOT,'" . $div . "','#form_" . $widget['NAME'] . "','#click_" . $widget['NAME'] . "');" . "\n";
						print "\t" . "$('#form_" . $widget['NAME'] . "').trigger('submit');" . "\n";
						print "\t" . '$("h4#date").text("Last Updated: "+Date());' . "\n";
						if(!empty($widget["REFRESH_SECS"]) && $widget["REFRESH_SECS"] > 0)
						{
							$secs = $widget["REFRESH_SECS"] * 1000;
							print "\tsetInterval(" . "\n\t\tfunction()\n\t\t{\n\t\t\t" . "$('#form_" . $widget['NAME'] . "').trigger('submit');;\n\t\t},\n\t" . $secs . ");\n";
						}
					}
					else
					{
						switch ($widget["SIZE"])
                        {
                            case 'small':
                                print "\t" . "$('#" . $div . "').addClass('small_div_class');" . "\n";
                                break;
                            case 'medium':
                                print "\t" . "$('#" . $div . "').addClass('med_div_class');" . "\n";
                                break;
                            case 'big':
                                print "\t" . "$('#" . $div . "').addClass('big_div_class');" . "\n";
                                break;
                        }
						print "\t" . $widget['NAME' ] . "_submit(ROOT,'" . $div . "','#form_" . $widget['NAME'] . "');\n";
						print "\t" . "$('#form_" . $widget['NAME'] . "').trigger('submit');" . "\n";
						print "\t" . '$("h4#date").text("Last Updated: "+Date());' . "\n";
						if(!empty($widget["REFRESH_SECS"]) && $widget["REFRESH_SECS"] > 0)
						{
							$secs = $widget["REFRESH_SECS"] * 1000;
							print "\tsetInterval(" . "\n\t\tfunction()\n\t\t{\n\t\t\t" . "$('#form_" . $widget['NAME'] . "').trigger('submit');;\n\t\t},\n\t" . $secs .");\n";
						}
					}
					$no++;		
				}
			}
			print "});\n}\n";
		}
	}
	else
	{
		print "Usage: $0 <dashboard_xx.inc>" . "\n";
	}
/*********************************************************************************************/

function print_top()
{
echo <<<EOF

// This script has been auto-generated by Open-Dashboard. Never attempt to
// modify this.
// Suraj Vijayan
//
function get_theme_cookie()
{
    var cookieName = 'themeID';
    var search = new RegExp(cookieName + '=([^;]*)');
    var matches = search.exec(document.cookie);
    var themeId = (matches ? matches[1] : '') || '';
    if(themeId == '')
		themeId = 'smoothness';
    set_theme(themeId);
}
/***************************************************************************************************/

function set_theme(id)
{
    switch(id)
    {
        case 'uidarkness':
            AmCharts.theme = AmCharts.themes.black;
        case 'dotluv':
            AmCharts.theme = AmCharts.themes.dark;
            break;
        case 'darkhive':
            AmCharts.theme = AmCharts.themes.black;
            break;
        case 'blacktie':
            AmCharts.theme = AmCharts.themes.dark;
            break;
        case 'uilightness':
        case 'smoothness':
            AmCharts.theme = AmCharts.themes.light;
            break;
        case 'cupertino':
            AmCharts.theme = 'black';
            $(".chosen-choices li").css("background","LightBlue");
            break;
        default:
            AmCharts.theme = AmCharts.themes.light;
            $(".chosen-choices li").css("background","LightBlue");
            break;
    }
}
/***************************************************************************************************/

function fn(id,name,url)
{
    window.location.reload(true);
}
/***************************************************************************************************/

function resize_div() 
{
	vpw = $(window).width();
	vph = $(window).height();
	vph = vph - 100;
	$('#scroll').css({'height': vph + 'px'});
}
/***************************************************************************************************/

function dispatch_events(ROOT)
{
var option;
$.themes.setDefaults({themeBase: '../jquery-ui-themes-1.12.1/themes/',
                      previews: '../js/themes-preview.gif',
                      icons: '../js/themes.gif',
                      cookieExpiry: 7,
                      themeFile: 'jquery-ui.css',
                      showPreview: false,
					  defaultTheme:'smoothness',
                      onSelect:fn});
$('#hoverThemes').hover(function() { $('#selectThemes').toggle()});
$('#selectThemes').hide();
$(window).onresize = function(event) 
{
	resize_div();
};

AmCharts.ready(function(){
	resize_div();
	$(window).on('resize', function()
	{
		resize_div();
	});
    get_theme_cookie();
    $('#selectThemes').themes({themes: ['darkhive','cupertino','smoothness','dotluv']});
    $('#scroll').css({'z-index':'1','position':'absolute'});
    $( '#list1 li').click(function()
    {
        $('#list1').option = $(this).text();
        $("h2#heading").text(option);
    });
    $(".date_input").datepicker({dateFormat: "yy-mm-dd"}).attr('readonly', 'true');
	$('.chosen-select').chosen({max_selected_options:4}).change();
EOF;
}
/*****************************************************************************************/
?>
